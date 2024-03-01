const xrpl = require('xrpl')

// Replace these values with the actual values
const fromAddress = "rU6LwHwCa4oCnZ7NSYX1z1xoUkXRuHQMEC"
const fromSecret = "snWVPSjDQREQq2XRYBkBrzQpc1R7S"
const toAddress = "rDQ5z21bZEasPkW7KWJ64SVapNfVNGjB38"
const amount = "1000" // The amount of XRP to send in drops, 1 XRP equals 1,000,000 drops

async function main() {
  // Define the network client
  const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233')
  await client.connect()

  // Define the wallet
  const wallet = xrpl.Wallet.fromSeed(fromSecret)

  // Prepare the transaction
  const preparedTx = await client.autofill({
    "TransactionType": "Payment",
    "Account": fromAddress,
    "Amount": xrpl.xrpToDrops(amount), // Convert the amount from XRP to drops
    "Destination": toAddress
  })

  // Sign the transaction
  const signedTx = wallet.sign(preparedTx)

  // Submit the transaction
  const tx = await client.submitAndWait(signedTx.tx_blob)

  console.log("Transaction result:", tx.result.meta.TransactionResult)
  console.log("Balance changes:", xrpl.getBalanceChanges(tx.result.meta))

  // Disconnect when done
  client.disconnect()
}

main()
