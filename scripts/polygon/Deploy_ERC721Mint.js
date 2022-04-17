// npx hardhat run scripts/polygon/Deploy_Polygon.js --network polygon
const network = hre.network.name;
const fs = require('fs');

async function main() {
  const namesAndAddresses = {};
  const [deployer] = await hre.ethers.getSigners();

  const PolygonERC721MintInstance = await ethers.getContractFactory('PolygonERC721Mint');
  const PolygonERC721Mint = await PolygonERC721MintInstance.deploy(process.env.ERC721MINT_NAME, 
    process.env.ERC721MINT_SYMBOL, process.env.ERC721MINT_URI);

  console.log('Network', network);
  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  console.log(`Smart contract has been deployed to: ${PolygonERC721Mint.address}`);

  namesAndAddresses.PolygonERC721Mint = PolygonERC721Mint.address;

  const data = await JSON.stringify(namesAndAddresses, null, 2);
  const dir = './networks/';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const fileName = 'PolygonERC721Mint_' + `${network}.json`;

  await fs.writeFileSync(dir + fileName, data, { encoding: 'utf8' });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });