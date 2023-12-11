const xrpl = require('xrpl');

async function sendXrp(client, fromAddress, fromSecret, toAddress, amount) {
  console.log("sendXrp called with:", client, fromAddress, fromSecret, toAddress, amount);

  // Define the network client
  //const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233')
  //await client.connect();
  console.log("Client connected");

  // Define the wallet
  const wallet = xrpl.Wallet.fromSeed(fromSecret, 'secp256k1');

// Prepare the transaction
const preparedTx = await client.autofill({
  "TransactionType": "Payment",
  "Account": fromAddress,
  "Amount": xrpl.xrpToDrops(amount),
  "Destination": toAddress
});
console.log("Transaction prepared:", preparedTx);

  // Sign the transaction
  const signedTx = wallet.sign(preparedTx);
  console.log("Transaction signed:", signedTx);

  // Submit the transaction
  const tx = await client.submitAndWait(signedTx.tx_blob);
  console.log("Transaction submitted:", tx);

  // Disconnect when done
  //client.disconnect();

  return tx;
}

module.exports = sendXrp;
