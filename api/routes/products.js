const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const ProductController = require('../controllers/products');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetyoe === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Upload Valid File'), false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5mb
    },
    fileFilter: fileFilter
});




router.get('/', ProductController.getProducts);

router.get('/:id', ProductController.getProductById);

router.post('/', checkAuth, upload.single('productImage'), ProductController.createProduct);

router.patch('/:id', checkAuth ,ProductController.updateProducts);

router.delete('/:id', checkAuth ,ProductController.deleteProductById);

module.exports = router;