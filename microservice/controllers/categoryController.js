const categoryService = require('../services/categoryService');

const getTopProductsByCategory = async (req, res, next) => {
    try {
        const { categoryName } = req.params;
        const { top = 10, page = 1 } = req.query;
        const topValue = Number(top);
        const pageValue = Number(page);

        if (topValue <= 10) {
            const products = await categoryService.getTopProductsByCategory(categoryName, topValue);
            res.json(products);
        } else {
            const { products, totalCount } = await categoryService.getPaginatedProductsByCategory(categoryName, topValue, pageValue);
            const totalPages = Math.ceil(totalCount / topValue);
            res.json({
                products,
                pagination: {
                    currentPage: pageValue,
                    totalPages,
                    totalCount,
                    pageSize: topValue
                }
            });
        }
    } catch (error) {
        next(error);
    }
};
const getSpecificProduct = async (req, res, next) => {
    try {
        const { categoryName, productId } = req.params;
        const product = await categoryService.getSpecificProduct(categoryName, productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getTopProductsByCategory,
    getSpecificProduct
};