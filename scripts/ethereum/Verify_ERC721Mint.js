// npx hardhat run scripts/ethereum/Verify_ERC721Mint.js --network mainnet
const network = hre.network.name;
const fs = require("fs");

async function main() {
  const dir = "./networks/";
  const fileName = "ERC721Mint_" + `${network}.json`;
  const data = JSON.parse(await fs.readFileSync(dir + fileName, { encoding: "utf8" }));

  try {
    await hre.run("verify:verify", {
      address: data.ERC721Mint,
      constructorArguments: [process.env.ERC721MINT_NAME, 
        process.env.ERC721MINT_SYMBOL, process.env.ERC721MINT_URI],
      contract: "contracts/ERC721Mint.sol:ERC721Mint",
    });
  } catch (e) {
    console.log(e);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
