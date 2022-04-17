const { pos } = require('./config');
const { getPOSClient, from } = require('./utils');

const execute = async () => {
  const client = await getPOSClient();
  const erc721Token = client.erc721(pos.parent.erc721, true);

  const isCheckPointed = await client.isCheckPointed('0x30ed80e67f193b7480a10c538d54b07ae561546fcfe9608361acfad762c64e26');
  console.log("isCheckPointed", isCheckPointed);

  const result = await erc721Token.withdrawExit('0x30ed80e67f193b7480a10c538d54b07ae561546fcfe9608361acfad762c64e26');

  const txHash = await result.getTransactionHash();
  console.log("txHash", txHash);
  const receipt = await result.getReceipt();
  console.log("receipt", receipt);

}
execute().then(() => {
}).catch(err => {
  console.error("err", err);
}).finally(_ => {
  process.exit(0);
})