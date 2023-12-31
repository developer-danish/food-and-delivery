const LeftOverModal = require('../models/LeftOverModal');
const Product = require('../models/Product');
const fs = require('fs');
exports.create = async (req, res) => {
    console.log("req body", req.body);
    console.log("req file", req.file);
    console.log("req user", req.user);

    const { filename } = req.file;
    const { productName, productDesc, productPrice, productCategory, productQuantity } = req.body;

    try {
        console.log("category  ", productCategory);
        let product = new Product();
        product.fileName = filename;
        product.productName = productName;
        product.productDesc = productDesc;
        product.productCategory = productCategory;
        product.productQuantity = productQuantity;
        product.productPrice = productPrice;
        
        await product.save();
        res.status(200).json({
            successMessage: `${productName} created successfully`,
            product
        });

    } catch (err) {
        console.log(err, "productController error");
        res.status(500).json({
            errorMessage: `Please try again later`
        });
    }
};

exports.leftOverCreate = async (req, res) => {
    console.log("req body", req.body);
    console.log("req file", req.file);
    console.log("req user", req.user);

    const { filename } = req.file;
    const { productName, productDesc, productPrice, productLatitude, productLongitude, productQuantity } = req.body;

    try {
        // console.log("category  ", productCategory);
        let product = new LeftOverModal();
        product.fileName = filename;
        product.productName = productName;
        product.productDesc = productDesc;
        product.productLongitude = productLongitude;
        product.productLatitude = productLatitude;
        product.productQuantity = productQuantity;
        product.productPrice = productPrice;
        
        await product.save();
        res.status(200).json({
            successMessage: `${productName} created successfully`,
            product
        });

    } catch (err) {
        console.log(err, "product leftOverController error");
        res.status(500).json({
            errorMessage: `Please try again later`
        });
    }
};

exports.readAll = async (req, res) => {

    try {
        const products = await Product.find({}).populate("productCategory", "category");
        res.json({ products });
    } catch (err) {

        res.status(500).json({
            errorMessage: `Please try again later`
        });
    }
};

exports.read = async (req, res) => {

    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        res.json(product);
    } catch (err) {
        res.status(500).json({
            errorMessage: `Please try again later`
        });
    }
};

exports.update = async (req, res) => {
    const productId = req.params.productId;
    
    if(req.file !== undefined){
        req.body.fileName = req.file.filename;
    }

    const oldProduct = await Product.findByIdAndUpdate(productId, req.body);

    if(req.file !== undefined && req.file.filename !== oldProduct.fileName){
        fs.unlink(`uploads/${oldProduct.fileName}`, err => {
            if (err) throw err;
            console.log("old image successfully deleted.........");
        });
    }

    res.json({
        successMessage: 'Product successfully updated...'
    })
};

exports.delete = async (req, res) => {

    try {
        const productId = req.params.productId;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        fs.unlink(`uploads/${deletedProduct.fileName}`, (err) => {
            if (err) throw err;
            console.log(err, "product deleted from filesystem");
        })
        res.json(deletedProduct);
    } catch (err) {
        res.status(500).json({
            errorMessage: `Please try again later`
        });
    }
};



