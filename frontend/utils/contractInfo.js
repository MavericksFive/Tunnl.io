export const stcContractAddress = "0x4F911A7f6D9241AD4C36b50617B31489A31166Be"; 
export const tunnlContractAddress = "0x1a4aC33A1997B39cC151503bacb393e14EFF48A8"; // Replace with your contract's address

export const tunnlContractABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "router",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "_donId",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "_tokenAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "EmptyArgs",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "EmptySource",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NoInlineSecrets",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "OnlyRouterCanFulfill",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "dealId",
        "type": "uint256"
      }
    ],
    "name": "ContentAccepted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "dealId",
        "type": "uint256"
      }
    ],
    "name": "ContentDisputed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "dealId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "postURL",
        "type": "string"
      }
    ],
    "name": "ContentPosted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "dealId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "influencerAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "brandAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "treasuryAmount",
        "type": "uint256"
      }
    ],
    "name": "DealCompleted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "dealId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "brand",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "influencer",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "brandDeposit",
            "type": "uint256"
          },
          {
            "internalType": "enum InfluencerMarketingContract.DealStatus",
            "name": "status",
            "type": "uint8"
          }
        ],
        "indexed": false,
        "internalType": "struct InfluencerMarketingContract.DealBasics",
        "name": "",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "timeToPost",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "timeToVerify",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "timeToPerform",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "postDeadline",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "verifyDeadline",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "performDeadline",
            "type": "uint256"
          }
        ],
        "indexed": false,
        "internalType": "struct InfluencerMarketingContract.DealDeadlines",
        "name": "",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "string",
            "name": "postURL",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "impressionsTarget",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "isAccepted",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "isDisputed",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "influencerSigned",
            "type": "bool"
          },
          {
            "internalType": "bytes32",
            "name": "expectedContentHash",
            "type": "bytes32"
          }
        ],
        "indexed": false,
        "internalType": "struct InfluencerMarketingContract.DealDetails",
        "name": "",
        "type": "tuple"
      }
    ],
    "name": "DealCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "dealId",
        "type": "uint256"
      }
    ],
    "name": "DealSigned",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "dealId",
        "type": "uint256"
      }
    ],
    "name": "DepositRefunded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "dealId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isAccepted",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "influencerAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "brandAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "treasuryAmount",
        "type": "uint256"
      }
    ],
    "name": "DisputedContentVerified",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "requestId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "result",
        "type": "bytes"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "err",
        "type": "bytes"
      }
    ],
    "name": "OCRResponse",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferRequested",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "id",
        "type": "bytes32"
      }
    ],
    "name": "RequestFulfilled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "id",
        "type": "bytes32"
      }
    ],
    "name": "RequestSent",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_dealId",
        "type": "uint256"
      }
    ],
    "name": "acceptContent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "acceptOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "name": "checkUpkeep",
    "outputs": [
      {
        "internalType": "bool",
        "name": "upkeepNeeded",
        "type": "bool"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_dealId",
        "type": "uint256"
      }
    ],
    "name": "claimDeposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_influencer",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_brandDeposit",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_timeToPost",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_timeToVerify",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_timeToPerform",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_impressionsTarget",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "_expectedContentHash",
        "type": "bytes32"
      }
    ],
    "name": "createDeal",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "dealBasics",
    "outputs": [
      {
        "internalType": "address",
        "name": "brand",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "influencer",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "brandDeposit",
        "type": "uint256"
      },
      {
        "internalType": "enum InfluencerMarketingContract.DealStatus",
        "name": "status",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "dealDeadlines",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "timeToPost",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "timeToVerify",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "timeToPerform",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "postDeadline",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "verifyDeadline",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "performDeadline",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "dealDetails",
    "outputs": [
      {
        "internalType": "string",
        "name": "postURL",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "impressionsTarget",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isAccepted",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isDisputed",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "influencerSigned",
        "type": "bool"
      },
      {
        "internalType": "bytes32",
        "name": "expectedContentHash",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_dealId",
        "type": "uint256"
      }
    ],
    "name": "deleteDeal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_dealId",
        "type": "uint256"
      }
    ],
    "name": "disputeContent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "donId",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "hahaLabsTreasury",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "hahaLabsVerifier",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "requestId",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "response",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "err",
        "type": "bytes"
      }
    ],
    "name": "handleOracleFulfillment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextDealId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "performData",
        "type": "bytes"
      }
    ],
    "name": "performUpkeep",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_dealId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_postURL",
        "type": "string"
      }
    ],
    "name": "postContent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "s_fulfillGasLimit",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "s_lastError",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "s_lastRequestId",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "s_lastResponse",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "s_lastUpkeepTimeStamp",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "s_requestCBOR",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "s_responseCounter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "s_subscriptionId",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "s_upkeepCounter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "newDonId",
        "type": "bytes32"
      }
    ],
    "name": "setDonId",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_newTreasurery",
        "type": "address"
      }
    ],
    "name": "setHahaLabsTreasury",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_newVerifier",
        "type": "address"
      }
    ],
    "name": "setHahaLabsVerifier",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint64",
        "name": "_subscriptionId",
        "type": "uint64"
      },
      {
        "internalType": "uint32",
        "name": "_fulfillGasLimit",
        "type": "uint32"
      },
      {
        "internalType": "string",
        "name": "_source",
        "type": "string"
      },
      {
        "internalType": "enum FunctionsRequest.Location",
        "name": "_secretsLocation",
        "type": "uint8"
      },
      {
        "internalType": "bytes",
        "name": "_encryptedSecretsReference",
        "type": "bytes"
      }
    ],
    "name": "setRequest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_dealId",
        "type": "uint256"
      }
    ],
    "name": "signDeal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "stableCoinAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_dealId",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "_isAccepted",
        "type": "bool"
      }
    ],
    "name": "verifyDisputedContent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

export const stcContractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "mintToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];