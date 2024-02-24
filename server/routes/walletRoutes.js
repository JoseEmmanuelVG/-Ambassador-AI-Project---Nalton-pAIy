const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');

router.post('/upload_image', (req, res) => {
    let part = req.files.image;

    let writeStream = gfs.createWriteStream({
        filename: part.name,
        mode: 'w',
        content_type: part.mimetype
    });

    writeStream.on('close', (uploadedFile) => {
        return res.status(200).send({
            message: 'File not found.',
            file: uploadedFile
        });
    });

    writeStream.write(part.data);

    writeStream.end();
});


const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const upload = multer({ storage: storage });




router.post('/save_wallet', walletController.save_wallet);
router.get('/get_wallets', walletController.get_wallets);
router.get('/get_wallet_details/:name', walletController.get_wallet_details);
router.delete('/delete_wallet/:name', walletController.delete_wallet);
router.put('/update_wallet/:id', walletController.update_wallet);
router.post('/select_wallet', walletController.select_wallet);
router.get('/get_balance_and_transactions/:address', walletController.getBalanceAndTransactionsForAddress);
router.post('/generate_image', walletController.generateImage);

const { getAllImageUrls } = require('../controllers/walletController');
router.get('/get_all_image_urls', walletController.getAllImageUrls);
router.post('/save_image_data', walletController.saveImageUrl);


router.post('/upload_image', upload.single('image'), walletController.handleUploadedImage);
router.get('/get_transaction/:hash', walletController.getTransactionByHash);
router.delete('/delete_saved_image', walletController.deleteSavedImage);



router.get('/image/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                message: 'File not found'
            });
        }

        if (file.contentType.startsWith('image')) {
            let readStream = gfs.createReadStream({ filename: req.params.filename });
            readStream.pipe(res);
        } else {
            res.status(404).json({
                message: 'Not an imagen'
            });
        }
    });
});


module.exports = router;