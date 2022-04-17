### ERC721Mint
#### Deploy
```npx hardhat run scripts/ethereum/Deploy_ERC721Mint.js``` --network mainnet

#### Verify
```npx hardhat run scripts/ethereum/Verify_ERC721Mint.js``` --network mainnet


### Polygon ERC721Mint
#### Deploy
```npx hardhat run scripts/polygon/Deploy_ERC721Mint.js``` --network polygon  

#### Verify
```npx hardhat run scripts/polygon/Verify_ERC721Mint.js``` --network polygon  

***

### Instruction for transfer tokens between Ethereum and Polygon
After our contracts are linked in mapper, we can move tokens from Ethereum to Polygon and back.  
```Attention!``` Only one of the managers appointed by the owner can produce mint of the ERC721Mint contract,  
so you must first add the desired address to the managers.

Child Chain Manager address: 0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa

* https://docs.polygon.technology/docs/develop/ethereum-polygon/mintable-assets

#### How to edit env
1. You have to copy the fields of env.example to .env 
2. Let's analyze each field:  

* PRIVATE_KEY: the private key of your wallet  
* SCAN_API_KEY: API key created from your ethereum account dashboard  
* SCAN_API_KEY_POLYGON: API key created from your polygon account dashboard  
* RPC_NODE_URL_RINKEBY: link to the rpc_node of the rinkeby network  
* RPC_NODE_URL_MAINNET: link to the rpc_node of the mainnet network  
* RPC_NODE_URL_GOERLI: link to the rpc_node of the goerli network  
* RPC_NODE_URL_MUMBAI: link to the rpc_node of the mumbai network  
* RPC_NODE_URL_POLYGON: link to the rpc_node of the polygon network  
* ERC721MINT_NAME: desired erc721 token name  
* ERC721MINT_SYMBOL: desired symbol of the token  
* ERC721MINT_URI: link to the URI of your token  
* ETHEREUM_ERC721: the address of your erc721 token in ethereum network  
* POLYGON_ERC721: the address of your erc721 token in polygon network  
* USER1_FROM: the address of your wallet  

3. Fill in the empty fields  

#### How config.js and utils.js work

#### Deposit (or how to transfer tokens from Ethereum to Polygon)
1. Approve token id from ERC721Mint to the address ERC721PredicateProxy (```0xE6F45376f64e1F568BD1404C155e5fFD2F80F7AD```)
2. Go to the RootChainManagerProxy and execute depositFor (```0x7CfA0f105a4922E89666D7D63689d9C9b1eA7a19```)  

* user (address) - the address of the user to whom the token will be transferred (specify your own)  
* rootToken (address) - address ERC721Mint  
* depositData (bytes) - encoded abi tokenid  

#### Withdraw (or how to transfer tokens from Polygon to Ethereum)
1. We specify the necessary token addresses in .env:  

* parent erc721 (ERC721Mint): ```ETHEREUM_ERC721```  
* child erc721 (Polygon_ERC721Mint): ```POLYGON_ERC721```  
* sender's address: ```USER1_FROM```

2. Withdrawal process:  

* Open withdraw_start.js, change the tokenId to the token id (for example, ‘5’), execute the script, copy the txHash  
* Waiting for the checkpoint (~15 minutes)  
* Opening withdraw_exit.js, substitute txHash in isCheckPointed() and withdrawExit(), execute the script  