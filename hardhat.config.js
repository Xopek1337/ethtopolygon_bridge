require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
require("hardhat-deploy");

module.exports = {
  solidity: {
    compilers: [
    {
      version: "0.8.10",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  ]
  },
  networks: {
    rinkeby: {
      url: process.env.RPC_NODE_URL_RINKEBY,
      gas: 2100000, 
      gasPrice: 8000000000,
      accounts: [process.env.PRIVATE_KEY]
    },
    mumbai: {
      url: process.env.RPC_NODE_URL_MUMBAI,
      gas: 2100000, 
      gasPrice: 8000000000,
      accounts: [process.env.PRIVATE_KEY]
    },
    polygon: {
      url: process.env.RPC_NODE_URL_POLYGON,
      gas: 2100000, 
      gasPrice: 8000000000,
      accounts: [process.env.PRIVATE_KEY]
    },
    mainnet: {
      url: process.env.RPC_NODE_URL_MAINNET,
      accounts: [process.env.PRIVATE_KEY]
    },
    goerli: {
      url: process.env.RPC_NODE_URL_GOERLI,
      accounts: [process.env.PRIVATE_KEY]
    },
  },
  etherscan: {
    apiKey: process.env.SCAN_API_KEY_POLYGON
  }
};
