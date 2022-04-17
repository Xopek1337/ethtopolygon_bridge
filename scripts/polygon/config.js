const dotenv = require('dotenv');
const path = require('path');
const env = dotenv.config();

if (env.error) {
  throw new Error("no env file found");
}

module.exports = {
  parent: {
    rpc: process.env.RPC_NODE_URL_MAINNET,
  },
  child: {
    rpc: process.env.RPC_NODE_URL_POLYGON || 'https://rpc-mainnet.matic.network',
  },
  pos: {
    parent: {
      erc721: process.env.ETHEREUM_ERC721,
      chainManagerAddress: '0x932532aA4c0174b8453839A6E44eE09Cc615F2b7', // Address of RootChainManager for POS Portal
    },
    child: {
      erc721: process.env.POLYGON_ERC721,
    },
  },
  WATCHER_URL: 'https://sentinel.matic.network/api/v2', // Backend service which syncs the Matic Plasma contract events on Ethereum mainchain to a MySQL database which we use for faster querying. This comes in handy especially for listening to asset deposits on the Plasma contract.
  user1: {
    // '<paste your private key here>' - A sample private key prefix with `0x`
    privateKey: process.env.PRIVATE_KEY,
    //'<paste address belonging to private key here>', Your address
    address: process.env.USER1_FROM
  },
  proofApi: process.env.SCAN_API_KEY_POLYGON || 'https://apis.matic.network/'
}