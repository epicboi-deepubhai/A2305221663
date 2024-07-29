const productsService = require('../services/productsService');

const getProducts = async (req, res, next) => {
    try {
        const { companyname, categoryname } = req.params;
        const { minPrice = 0, maxPrice = Infinity, top = 10 } = req.query;

        const products = await productsService.getProducts(companyname, categoryname, minPrice, maxPrice, top);
        res.json(products);
    } catch (error) {
        next(error);
    }
};

const getProductDetails = async (req, res, next) => {
    try {
        const { companyname, categoryname, productid } = req.params;

        const productDetails = await productsService.getProductDetails(companyname, categoryname, productid);
        res.json(productDetails);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProducts,
    getProductDetails
};
