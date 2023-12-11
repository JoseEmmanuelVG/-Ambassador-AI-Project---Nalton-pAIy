const Wallet = require('../models/nalton_wallets');
const { encrypt, decrypt } = require('../utils/cryptoUtils');
const generateImageFromText = require('../utils/generateImage');
const GeneratedImage = require('../models/generate_image.js');

// We define the methods for each route. 
// The methods are exported to be used in the routes file.

// Create a new wallet
async function save_wallet (req, res) {
    const { name, address, secretKey } = req.body;
    const wallet = new Wallet({
      name: name,
      address: address,
      secretKey: encrypt(secretKey) // Save the encrypted secretKey
  });
  try { 
      await wallet.save();
      res.json({ message: 'Wallet saved successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Error saving wallet.' });
    }
};

// Get all wallets
async function get_wallets (req, res) {

  try {
      const wallets = await Wallet.find({});
      res.json(wallets);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching wallets.' });
    }
};


// Get wallet details by name (address and secretKey) 
async function get_wallet_details   (req, res) {

  try {
      const walletName = req.params.name;
      const wallet = await Wallet.findOne({ name: walletName });
  
      if (wallet) {
        res.json({
          name: wallet.name,
          address: wallet.address,
          // We do not return the secretKey for security reasons.
        });
      } else {
        res.status(404).json({ message: 'Wallet not found.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching wallet details.' });
    }
};



// Select a wallet by name (address and secretKey)
async function select_wallet (req, res) {
    const walletName = req.body.wallet;
  
    // We search for the portfolio in the database
    const wallet = await Wallet.findOne({ name: walletName });
  
    if (wallet) {
      // Update selectedWallet with the found wallet
      selectedWallet = {
        address: wallet.address,
        secret: decrypt(wallet.secretKey) // We decrypt the secretKey
      };
      
      res.json({
        message: `Wallet ${walletName} seleccionada.`,
        confirmation: 'ok',
        address: selectedWallet.address,
      });
    } else {
      res.status(400).json({
        message: 'Billetera no encontrada.',
        error: 'No hay registros',
      });
    }
};



// Delete wallet by name (address and secretKey) 
async function delete_wallet  (req, res ) { 
    try {
        const walletName = req.params.name;
        const { secretKey } = req.body;
        
        const wallet = await Wallet.findOne({ name: walletName });
    
        if (!wallet) {
          return res.status(404).json({ message: 'Wallet not found.' });
        }
    
        const decryptedKey = decrypt(wallet.secretKey);
        
        if (decryptedKey !== secretKey) {
          return res.status(403).json({ message: 'Invalid secret key.' });
        }
    
        await Wallet.findOneAndDelete({ name: walletName });
        res.json({ message: 'Wallet deleted successfully!' }); 
      } catch (error) {
        res.status(500).json({ message: 'Error deleting wallet.' });
      }
}

const RIPPLE_EPOCH = 946684800; 
// Update wallet by name (address and secretKey)
async function update_wallet   (req, res)  {
    const { name, address, secretKey } = req.body;
  try {
    const updatedWallet = await Wallet.findByIdAndUpdate(req.params.id, {
      name: name,
      address: address,
      secretKey: encrypt(secretKey)
    });
    
    if (!updatedWallet) {
      return res.status(404).json({ message: 'Wallet not found.' });
    }
    
    res.json({ message: 'Wallet updated successfully!' });
  } catch (error) {
    console.error('Update wallet error:', error);  
    res.status(500).json({ message: 'Error updating wallet.' });
  }
};



// Get balance and transactions for address
const { Client } = require('xrpl');
const client = new Client('wss://s.altnet.rippletest.net:51233');
async function getBalanceAndTransactionsForAddress(req, res) {
  const address = req.params.address; 

  try {
      await client.connect();

      const accountInfo = await client.request({
          command: 'account_info',
          account: address,
      });

      const balance = accountInfo.result.account_data.Balance / 1000000; // Convertir a XRP antes de enviar

      const transactions = await client.request({
          command: 'account_tx',
          account: address,
      });

      await client.disconnect();

      // Changing the transaction format 
      const formattedTransactions = transactions.result.transactions.map(tx => ({
        fecha: new Date((tx.tx.date + RIPPLE_EPOCH) * 1000).toISOString(), // add RIPPLE_EPOCH 
          tipo: tx.tx.TransactionType,
          hash: tx.tx.hash,
          fee: tx.tx.Fee,
          cantidad: tx.tx.Amount / 1000000, // change to XRP
          walletEnvio: tx.tx.Account,
          walletRecibido: tx.tx.Destination
      }));

      res.json({ balance, transactions: formattedTransactions });
  } catch (error) {
      console.error('Error on getBalanceAndTransactionsForAddress:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
}


// Generate image from text
async function generateImage  (req, res) {
  try {
      const { text, dalleKey } = req.body;  // Obtener DALL-E key del cuerpo
      const imageUrl = await generateImageFromText(text, dalleKey);  // Pasarlo como segundo argumento
      res.json({ imageUrl });
  } catch (error) {
      console.error("Error in generateImage:", error);
      res.status(500).json({ message: "Error generating image. Please try again later." });
  }  
};





// Guardar URL de la imagen en MongoDB
async function saveImageUrl(req, res) {
  const { imageUrl, transactionHash, description } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ message: 'imageUrl is required' });
  }

  const image = new GeneratedImage({
    imageUrl,
    transactionHash,
    description
  });

  try {
    await image.save();
    res.json({ message: 'Image saved successfully' });
  } catch (error) {
    console.error('Error saving the image:', error);
    res.status(500).json({ message: 'Error saving image' });
  }
}


// Get all MongoDB images with their details
async function getAllImageUrls(req, res) {
  try {
    const images = await GeneratedImage.find();
    res.json(images); 
  } catch (error) {
    console.error('Error obtaining images:', error);
    res.status(500).json({ message: 'Error obtaining images' });
  }
}






const handleUploadedImage = (req, res) => {
  try {
    const imageUrl = `uploads/${req.file.filename}`;
    res.status(200).json({ message: "Image successfully uploaded.", imageUrl });
  } catch (error) {
    console.error("Error handling the uploaded image:", error);
    res.status(500).json({ message: "Error uploading the image." });
  }
}


async function getTransactionByHash(req, res) {
  const hash = req.params.hash;

  try {
      await client.connect();

      const transaction = await client.request({
          command: 'tx',
          transaction: hash,
      });

      await client.disconnect();

      res.json(transaction);
  } catch (error) {
      console.error("Error obtaining the transaction:", error);
      res.status(500).json({ message: "Error obtaining the transaction." });
  }
}

async function deleteSavedImage(req, res) {
  const { imageUrl, hash, description } = req.body;

  if (!imageUrl && !hash && !description) {
      return res.status(400).json({ message: 'At least one of the following is required: imageUrl, hash, or description.' });
  }

  try {
      if (imageUrl) {
          await GeneratedImage.findOneAndDelete({ imageUrl });
      } else if (hash) {
          await GeneratedImage.findOneAndDelete({ transactionHash: hash });
      } else if (description) {
          await GeneratedImage.findOneAndDelete({ description });
      }
      
      // Delete from localStorage
      res.json({ message: 'Image and data successfully deleted.' });
  } catch (error) {
      console.error("Error deleting image and data:", error);
      res.status(500).json({ message: "Error deleting image and data." });
  }
}



module.exports = {
  save_wallet,
  get_wallets,
  get_wallet_details,
  select_wallet,
  delete_wallet,
  update_wallet,
  getBalanceAndTransactionsForAddress,
  generateImage,

  saveImageUrl,
  getAllImageUrls,

  handleUploadedImage,
  getTransactionByHash,
  deleteSavedImage,
};



