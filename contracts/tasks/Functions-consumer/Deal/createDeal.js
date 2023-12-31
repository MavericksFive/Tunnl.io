const { types } = require("hardhat/config")
const { networks } = require("../../../networks")
const { BigNumber } = require('ethers');

task("create-deal", "Creates a new deal")
  .addParam("influencer", "Influencer address")
  .addParam("contract", "Address of the contract")
  .addOptionalParam("verify", "Set to true to verify consumer contract", false, types.boolean)
  .addOptionalParam(
    "configpath",
    "Path to Functions request config file",
    `${__dirname}/../../Functions-request-config.js`,
    types.string
  )
  .setAction(async (taskArgs) => {
    console.log("\n__Compiling Contracts__")
    await run("compile")
    
    let gasLimit, gasPrice;

    // Manually specify gas limit and gas price
    gasLimit = ethers.utils.hexlify(1000000); // Example gas limit
    gasPrice = ethers.utils.parseUnits("25", "gwei"); // Example gas price

    let brand, influencer

    [brand, influencer] = await ethers.getSigners();


    InfluencerMarketingContract = await ethers.getContractFactory("InfluencerMarketingContract");
    contract = await InfluencerMarketingContract.attach(taskArgs.contract);

    StableCoinContract = await ethers.getContractFactory("SimpleStableCoin");
    stcContract = await StableCoinContract.attach("0x97Cd2703B70f97A70d5aA8cf951072b2894677dA");
    stcDecimals = await stcContract.decimals();

    await stcContract.connect(brand).approve(contract.address, BigNumber.from(10000).pow(stcDecimals), {gasLimit,gasPrice})

     // Define parameters for createDeal function based on your contract's requirements
     const influencerAddress = influencer.address;
     const brandDeposit = 10000; // for example, 10 tokens
     const timeToPost = 3600; // in seconds
     const timeToVerify = 3600; // in seconds
     const timeToPerform = 1; // in seconds
     const impressionsTarget = 1000;
     const expectedContentHash = "0xaf0ce9c95a4a15b4aca49063258060870978337d4dd662521086aca28af1fcfb"; // example content hash

     let initialDealCount = await contract.nextDealId();
     // Call the createDeal function
     const tx = await contract.connect(brand).createDeal(
         influencerAddress,
         brandDeposit,
         timeToPost,
         timeToVerify,
         timeToPerform,
         impressionsTarget,
         expectedContentHash,
         {gasLimit, gasPrice}

     );

    await tx.wait(networks[network.name].confirmations)

    console.log(`\n The content accepted transaction has the following hash ${tx.hash} on ${network.name}`)
    console.log(`\n The deal created has the following ID, ${initialDealCount}`)

});