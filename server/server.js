const express = require('express');
const cors = require('cors');
const app = express();
const dbConnect = require('./middlewares/dbConnect');
const walletRoutes = require('./routes/walletRoutes');
const sendXrp = require('./send_xrp');
console.log("sendXrp imported:", typeof sendXrp);const xrpl = require('xrpl');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');


const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use('/api/user', userRoutes);
app.use('/api/wallet', authMiddleware, walletRoutes);





let gfs;

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
const conn = mongoose.connection;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});


// Base setup
app.use(express.json());
app.use('/api/wallet', walletRoutes);
// DB Connection
dbConnect();


const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233');

let isConnected = false;

client.connect().then(() => {
  console.log('Client connected to XRPL Testnet');
  isConnected = true;
});

client.on('disconnected', (code) => {
  console.log('Client disconnected from XRPL Testnet, code:', code);
  isConnected = false;
});


app.post('/api/send_xrp', async (req, res, next) => {
  try {
    console.log("Request received:", req.body);

    if (!selectedWallet) {
      res.status(400).json({ message: 'Ninguna billetera ha sido seleccionada.' });
      return;
    }

    if (!isConnected) {
      res.status(500).json({ message: 'Cliente no conectado a XRPL Testnet.' });
      return;
    }
    const destination = req.body.destination.trim(); // Trim para eliminar espacios o saltos de línea
    const amount = req.body.amount.trim();

    if (isNaN(amount) || Number(amount) <= 0) {
      res.status(400).json({ message: 'Cantidad no válida.' });
      return;
    }

    console.log("Destination:", destination, "Amount:", amount);

// Connect the customer before preparing the transaction
const tx = await sendXrp(client, selectedWallet.address, selectedWallet.secret, destination, amount);

if (tx.result.TransactionResult === 'tesSUCCESS') {
  res.json({
    message: 'Transacción enviada',
    transactionResult: tx.result.meta.TransactionResult,
    balanceChanges: xrpl.getBalanceChanges(tx.result.meta),
  });
} else {
  res.json({
    message: 'Envio exitoso Mensaje else tipo 2',
    error: tx.result.engine_result_message,
  });
}

} catch (error) {
  console.error('Error handling /api/send_xrp:', error);
  next(error);
}
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Algo salió mal.', error: err.message });
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));