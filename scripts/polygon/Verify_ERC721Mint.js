// npx hardhat run scripts/polygon/Verify_Polygon.js --network polygon
const network = hre.network.name;
const fs = require("fs");

async function main() {
  const dir = "./networks/";
  const fileName = "PolygonERC721Mint_" + `${network}.json`;
  const data = JSON.parse(await fs.readFileSync(dir + fileName, { encoding: "utf8" }));

  try {
    await hre.run("verify:verify", {
      address: data.PolygonERC721Mint,
      constructorArguments: [process.env.POLYGON_ERC721MINT_NAME, 
        process.env.POLYGON_ERC721MINT_SYMBOL, process.env.POLYGON_ERC721MINT_URI],
      contract: "contracts/PolygonERC721Mint.sol:PolygonERC721Mint",
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
