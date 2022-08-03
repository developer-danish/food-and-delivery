const Product = require('../models/Product');

exports.create = async (req, res) => {
    console.log("req body",req.body);
    console.log("req file",req.file);
    console.log("req user",req.user);

    const {filename} = req.file;
    const {productName, productDesc, productPrice, productCategory, productQuantity} = req.body;

    try{
        console.log("category  ",productCategory);
        let product = new Product();
        product.fileName=filename;
        product.productName=productName;
        product.productDesc=productDesc;
        product.productCategory=productCategory;
        product.productQuantity=productQuantity;
        product.productPrice=productPrice;

        await product.save();
        res.status(200).json({
            successMessage:`${productName} created successfully`,
            product
        });

    }catch(err){
        console.log(err, "productController error");
        res.status(500).json({
            errorMessage:`Please try again later`
        });
    }
};
