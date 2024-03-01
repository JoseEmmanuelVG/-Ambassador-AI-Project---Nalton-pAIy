const crypto = require('crypto');
require('dotenv').config({ path: '../environment_variables.env' });

const algorithm = 'aes-256-cbc';
const secretKey = process.env.CRYPTO_SECRET_KEY;
const iv = Buffer.from('vectorinicial123', 'utf8');


console.log('Secret Key from env:', process.env.CRYPTO_SECRET_KEY);

if (secretKey.length !== 32) {
  console.error('SecretKey has an invalid length:', secretKey.length);
}
if (iv.length !== 16) {
  console.error('IV has an invalid length:', iv.length);
}

// use this method to encrypt the secretKey before saving it to the database
exports.encrypt = (text) => {
    try {
        const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
        const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
        return encrypted.toString('hex');
    } catch (error) {
        console.error('Error encrypting:', error);
        return null;
    }
};

exports.decrypt = (text) => {
    try {
        const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
        const decrypted = Buffer.concat([decipher.update(Buffer.from(text, 'hex')), decipher.final()]);
        return decrypted.toString();
    } catch (error) {
        console.error('Error decrypting:', error);
        return null;
    }
};
