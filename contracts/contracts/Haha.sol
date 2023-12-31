// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Placeholder for Chainlink interfaces, assuming they are imported here
// import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";
import {AutomationCompatibleInterface} from "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

interface IStableCoin is IERC20 {
  function decimals() external returns (uint8);
}

contract InfluencerMarketingContract is FunctionsClient, ConfirmedOwner, AutomationCompatibleInterface {
  using FunctionsRequest for FunctionsRequest.Request;

  //Stable coin contract address
  address public stableCoinAddress; // SimpleStableCoin address for payouts.

  // State variables for Chainlink Functions
  bytes32 public donId;
  bytes public s_requestCBOR;
  uint64 public s_subscriptionId;
  uint32 public s_fulfillGasLimit;
  bytes32 public s_lastRequestId;
  bytes public s_lastResponse;
  bytes public s_lastError;

  // Perform algorithm source code
  string public source;
  FunctionsRequest.Location secretsLocation;
  bytes encryptedSecretsReference;

  // State variables for Chainlink Automation
  uint256 public s_lastUpkeepTimeStamp;
  uint256 public s_upkeepCounter;
  uint256 public s_responseCounter;

  event OCRResponse(bytes32 indexed requestId, bytes result, bytes err);

  /**
   * @notice Executes once when a contract is created to initialize state variables
   *
   * @param router The Functions Router contract for the network
   * @param _donId The DON Id for the DON that will execute the Function
   */

  enum DealStatus {
    Done,
    Active,
    Failed
  }

  struct DealBasics {
    address brand;
    address influencer;
    uint256 brandDeposit;
    DealStatus status;
  }

  struct DealDeadlines {
    uint256 timeToPost;
    uint256 timeToVerify;
    uint256 timeToPerform;
    uint256 postDeadline;
    uint256 verifyDeadline;
    uint256 performDeadline;
  }

  struct DealDetails {
    string postURL;
    uint256 impressionsTarget;
    bool isAccepted;
    bool isDisputed;
    bool influencerSigned;
    bytes32 expectedContentHash;
  }

  mapping(uint256 => DealBasics) public dealBasics;
  mapping(uint256 => DealDeadlines) public dealDeadlines;
  mapping(uint256 => DealDetails) public dealDetails;
  mapping(uint256 => uint256) private upkeepDealIdMapping;

  // Define a new role for Haha Labs' administrator
  address public hahaLabsVerifier;

  // Define the hahaLabsTreasury
  address public hahaLabsTreasury;

  uint256[] performDeals; //Deals which are the performance stage...

  uint256 public nextDealId;

  event DealCreated(uint256 indexed dealId, DealBasics, DealDeadlines, DealDetails);
  event DealSigned(uint256 indexed dealId);
  event ContentPosted(uint256 indexed dealId, string postURL);
  event ContentAccepted(uint256 indexed dealId);
  event ContentDisputed(uint256 indexed dealId);
  event DepositRefunded(uint256 indexed dealId);
  event DisputedContentVerified(
    uint256 indexed dealId,
    bool isAccepted,
    uint256 influencerAmount,
    uint256 brandAmount,
    uint256 treasuryAmount
  );
  event DealCompleted(uint256 indexed dealId, uint256 influencerAmount, uint256 brandAmount, uint256 treasuryAmount);

  constructor(
    address router,
    bytes32 _donId,
    address _tokenAddress
  ) FunctionsClient(router) ConfirmedOwner(msg.sender) {
    donId = _donId;
    hahaLabsVerifier = msg.sender; // Initially set to the contract creator
    hahaLabsTreasury = msg.sender; // Initially set to the contract creator
    s_lastUpkeepTimeStamp = 0;
    stableCoinAddress = _tokenAddress;
  }

  // CHAINLINK AUTOMATED FUNCTIONS RELATED FUNCTIONS //

  /**
   * @notice Sets the bytes representing the CBOR-encoded FunctionsRequest.Request that is sent when performUpkeep is called

   * @param _subscriptionId The Functions billing subscription ID used to pay for Functions requests
   * @param _fulfillGasLimit Maximum amount of gas used to call the client contract's `handleOracleFulfillment` function
   * @param _source Perform algorithm source code
   * @param _secretsLocation secretsLocation
   * @param _encryptedSecretsReference encryptedSecretsReference


   */

  function setRequest(
    uint64 _subscriptionId,
    uint32 _fulfillGasLimit,
    string calldata _source,
    FunctionsRequest.Location _secretsLocation,
    bytes calldata _encryptedSecretsReference
  ) external onlyOwner {
    s_subscriptionId = _subscriptionId;
    s_fulfillGasLimit = _fulfillGasLimit;
    source = _source;
    secretsLocation = _secretsLocation;
    encryptedSecretsReference = _encryptedSecretsReference;
  }

  /**
   * @notice Used by Automation to check if performUpkeep should be called.
   *
   * The function's argument is unused in this example, but there is an option to have Automation pass custom data
   * that can be used by the checkUpkeep function.
   *
   * Returns a tuple where the first element is a boolean which determines if upkeep is needed and the
   * second element contains custom bytes data which is passed to performUpkeep when it is called by Automation.
   */
  // Refactored checkUpkeep function
  function checkUpkeep(bytes memory) public view override returns (bool upkeepNeeded, bytes memory) {
    for (uint256 i = 0; i < performDeals.length; i++) {
      uint256 dealId = performDeals[i];
      DealDeadlines storage deadlines = dealDeadlines[dealId];
      if (block.timestamp >= deadlines.performDeadline && dealBasics[dealId].status == DealStatus.Active) {
        return (true, abi.encode(dealId, i));
      }
    }
    return (false, bytes(""));
  }

  // Refactored performUpkeep function
  function performUpkeep(bytes calldata performData) external override {
    (uint256 dealId, uint256 index) = abi.decode(performData, (uint256, uint256));
    (bool upkeepNeeded, ) = checkUpkeep("");
    require(upkeepNeeded, "Condition not met");
    _executeUpkeep(dealId, index);
  }

  function _executeUpkeep(uint256 dealId, uint256 index) internal {
    // Store the dealId with the current upkeep counter
    upkeepDealIdMapping[s_upkeepCounter] = dealId;
    FunctionsRequest.Request memory req = _prepareRequest(dealId);
    s_lastRequestId = _sendRequest(req.encodeCBOR(), s_subscriptionId, s_fulfillGasLimit, donId);
    _removeDealFromCheckList(index);
    s_upkeepCounter = s_upkeepCounter + 1;
  }

  // Refactored _removeDealFromCheckList function
  function _removeDealFromCheckList(uint256 index) internal {
    require(index < performDeals.length, "Deal not found in the list");
    performDeals[index] = performDeals[performDeals.length - 1];
    performDeals.pop();
  }

  function _prepareRequest(uint256 dealId) internal view returns (FunctionsRequest.Request memory) {
    FunctionsRequest.Request memory req;
    req.initializeRequest(FunctionsRequest.Location.Inline, FunctionsRequest.CodeLanguage.JavaScript, source);
    req.secretsLocation = secretsLocation;
    req.encryptedSecretsReference = encryptedSecretsReference;

    DealDetails storage details = dealDetails[dealId];

    string[] memory args = new string[](1);
    args[0] = details.postURL;
    req.setArgs(args);

    return req;
  }

  /**
   * @notice Callback that is invoked once the DON has resolved the request or hit an error
   *
   * @param requestId The request ID, returned by sendRequest()
   * @param response Aggregated response from the user code
   * @param err Aggregated error from the user code or from the execution pipeline
   * Either response or error parameter will be set, but never both
   */
  function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal override {
    // Retrieve the dealId using the responseCounter
    uint256 dealId = upkeepDealIdMapping[s_responseCounter];

    s_responseCounter = s_responseCounter + 1;

    uint256 totalImpressions;

    (totalImpressions) = abi.decode(response, (uint256));

    DealBasics storage basics = dealBasics[dealId];
    require(basics.status != DealStatus.Done, "Deal already ended.");

    DealDetails storage details = dealDetails[dealId];
    DealDeadlines storage deadlines = dealDeadlines[dealId];

    bool reachedGoal = details.impressionsTarget <= totalImpressions;
    bool expired = !reachedGoal && deadlines.performDeadline > block.timestamp;
    require(reachedGoal || expired, "Not time for payments.");

    uint256 treasuryAmount = (basics.brandDeposit * 10) / 100; //Treasury always takes 10%
    uint256 availableAmount = basics.brandDeposit - treasuryAmount;
    uint256 influencerAmount = 0;
    uint256 brandAmount = 0;

    if (reachedGoal) {
      influencerAmount = availableAmount;
    } else {
      influencerAmount = (((totalImpressions * 100) / details.impressionsTarget) * availableAmount) / 100;
      brandAmount = availableAmount - influencerAmount;
    }

    _payAddress(basics.influencer, influencerAmount);
    _payAddress(basics.brand, brandAmount);
    _payAddress(hahaLabsTreasury, treasuryAmount);
    basics.status = DealStatus.Done;

    emit DealCompleted(dealId, influencerAmount, brandAmount, treasuryAmount);
  }

  /**
   * @notice Set the DON ID
   * @param newDonId New DON ID
   */
  function setDonId(bytes32 newDonId) external onlyOwner {
    donId = newDonId;
  }

  // SMART CONTRACT LOGIC //

  // Function to set or change Haha Labs' admin
  function setHahaLabsVerifier(address _newVerifier) external onlyOwner {
    hahaLabsVerifier = _newVerifier;
  }

  // Function to set or change Haha Labs' admin
  function setHahaLabsTreasury(address _newTreasurery) external onlyOwner {
    hahaLabsTreasury = _newTreasurery;
  }

  function verifyDisputedContent(uint256 _dealId, bool _isAccepted) external {
    require(msg.sender == hahaLabsVerifier, "Only Haha Labs' verifier can verify content");

    DealBasics storage basics = dealBasics[_dealId];
    DealDetails storage details = dealDetails[_dealId];

    require(details.isDisputed, "Content is not disputed");

    if (_isAccepted) {
      // Content verified, update deal status
      details.isAccepted = true;
      details.isDisputed = false;

      uint256 influencerAmount = (basics.brandDeposit * 95) / 100; // 95% to the influencer
      uint256 hahaLabsFee = (basics.brandDeposit * 5) / 100; // 5% as verification fee

      // Ensure the total amount does not exceed the brand deposit
      require(influencerAmount + hahaLabsFee <= basics.brandDeposit, "Total transfer amount exceeds deposit");

      // Transfer funds
      _payAddress(basics.influencer, influencerAmount);
      _payAddress(hahaLabsTreasury, hahaLabsFee);

      // Emit the event after transfers
      emit DisputedContentVerified(_dealId, true, influencerAmount, 0, hahaLabsFee);
    } else {
      // Content not verified, potentially refund the brand
      details.isDisputed = false;
      // Transfers back the brand deposit to the brand
      uint256 refundAmount = basics.brandDeposit;

      _payAddress(basics.brand, refundAmount);

      emit DisputedContentVerified(
        _dealId,
        false,
        0, // No amount for influencer
        basics.brandDeposit, // Full refund to brand
        0 // No amount for hahaLabs
      );
    }

    // Mark the deal as Failed
    basics.status = DealStatus.Failed;
  }

  function createDeal(
    address _influencer,
    uint256 _brandDeposit,
    uint256 _timeToPost,
    uint256 _timeToVerify,
    uint256 _timeToPerform,
    uint256 _impressionsTarget,
    bytes32 _expectedContentHash
  ) external payable {
    IStableCoin token = IStableCoin(stableCoinAddress);

    require(token.transferFrom(msg.sender, address(this), _brandDeposit), "Tokens transfer failed");

    dealBasics[nextDealId] = DealBasics({
      brand: msg.sender,
      influencer: _influencer,
      brandDeposit: _brandDeposit,
      status: DealStatus.Active
    });

    dealDeadlines[nextDealId] = DealDeadlines({
      timeToPost: _timeToPost,
      timeToVerify: _timeToVerify,
      timeToPerform: _timeToPerform,
      postDeadline: 0,
      verifyDeadline: 0,
      performDeadline: 0
    });

    dealDetails[nextDealId] = DealDetails({
      postURL: "",
      impressionsTarget: _impressionsTarget,
      isAccepted: false,
      isDisputed: false,
      influencerSigned: false,
      expectedContentHash: _expectedContentHash
    });

    emit DealCreated(nextDealId, dealBasics[nextDealId], dealDeadlines[nextDealId], dealDetails[nextDealId]);

    nextDealId++;
  }

  function signDeal(uint256 _dealId) external {
    DealBasics storage basics = dealBasics[_dealId];
    DealDeadlines storage deadlines = dealDeadlines[_dealId];
    DealDetails storage details = dealDetails[_dealId];

    require(basics.status == DealStatus.Active, "The deal was deleted or is already done");
    require(msg.sender == basics.influencer, "Only the designated influencer can sign the deal");
    require(!details.influencerSigned, "Deal already signed");

    deadlines.postDeadline = block.timestamp + deadlines.timeToPost;
    details.influencerSigned = true;

    emit DealSigned(_dealId);
  }

  function postContent(uint256 _dealId, string memory _postURL) external {
    DealBasics storage basics = dealBasics[_dealId];
    DealDeadlines storage deadlines = dealDeadlines[_dealId];
    DealDetails storage details = dealDetails[_dealId];

    require(msg.sender == basics.influencer, "Only influencer can post content");
    require(details.influencerSigned, "Influencer must sign the deal first");
    require(basics.status == DealStatus.Active, "The deal was deleted or is already done");

    deadlines.verifyDeadline = block.timestamp + deadlines.timeToVerify;
    details.postURL = _postURL;

    emit ContentPosted(_dealId, _postURL);
  }

  function acceptContent(uint256 _dealId) external {
    DealBasics storage basics = dealBasics[_dealId];
    DealDeadlines storage deadlines = dealDeadlines[_dealId];
    DealDetails storage details = dealDetails[_dealId];

    require(msg.sender == basics.brand, "Only brand can accept content");
    require(deadlines.verifyDeadline != 0, "Content has not been posted yet");
    require(block.timestamp <= deadlines.verifyDeadline, "Verification period has expired");

    details.isAccepted = true;
    deadlines.performDeadline = block.timestamp + deadlines.timeToPerform;

    performDeals.push(_dealId);

    emit ContentAccepted(_dealId);
  }

  function disputeContent(uint256 _dealId) external {
    DealBasics storage basics = dealBasics[_dealId];
    DealDeadlines storage deadlines = dealDeadlines[_dealId];
    DealDetails storage details = dealDetails[_dealId];

    require(msg.sender == basics.brand, "Only brand can dispute content");
    require(deadlines.verifyDeadline != 0, "Content has not been posted yet");
    require(block.timestamp <= deadlines.verifyDeadline, "Verification period has expired");

    details.isDisputed = true;

    emit ContentDisputed(_dealId);
  }

  function claimDeposit(uint256 _dealId) external {
    DealBasics storage basics = dealBasics[_dealId];
    DealDeadlines storage deadlines = dealDeadlines[_dealId];
    DealDetails storage details = dealDetails[_dealId];

    require(msg.sender == basics.brand, "Only the brand can claim the deposit");
    require(
      keccak256(abi.encodePacked(details.postURL)) == keccak256(abi.encodePacked("")) &&
        block.timestamp >= deadlines.postDeadline,
      "Content posted by the influencer before the post deadLine"
    );

    uint256 refundAmount = basics.brandDeposit;
    require(refundAmount > 0, "No deposit to refund");

    _payAddress(basics.brand, refundAmount);
    basics.brandDeposit = 0;
    basics.status = DealStatus.Failed;

    emit DepositRefunded(_dealId);
  }

  function deleteDeal(uint256 _dealId) external {
    DealBasics storage basics = dealBasics[_dealId];
    DealDetails storage details = dealDetails[_dealId];

    require(msg.sender == basics.brand, "Only the brand can delete the deal");
    require(!details.influencerSigned, "The deal has been signed already");

    uint256 refundAmount = basics.brandDeposit;
    require(refundAmount > 0, "No deposit to refund");

    _payAddress(basics.brand, refundAmount);
    basics.status = DealStatus.Failed;

    emit DepositRefunded(_dealId);
  }

  //Pay the mentionned address with contracts funds
  function _payAddress(address recipient, uint256 amount) internal {
    IStableCoin token = IStableCoin(stableCoinAddress);

    require(recipient != address(0), "Invalid recipient address");
    require(amount > 0, "Amount must be greater than zero");

    // Assuming `stableCoin` is your ERC20 token instance
    require(token.transfer(recipient, amount), "Token transfer failed");
  }
}
