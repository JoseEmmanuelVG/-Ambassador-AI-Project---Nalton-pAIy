const mongoose = require('mongoose');

const generatedImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  transactionHash: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  }
});

const GeneratedImage = mongoose.model('GeneratedImage', generatedImageSchema);

module.exports = GeneratedImage;



