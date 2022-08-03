const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const { authenticateJWT } = require('../middleware/authenticator');
const upload = require('../middleware/multer');

router.post("/", authenticateJWT, upload.single('productImage'), productController.create);

module.exports = router;
