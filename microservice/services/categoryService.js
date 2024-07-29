const { getProductDataFromAPI, getAuthToken } = require('../utils/db');

const getTopProductsByCategory = async (categoryName, top) => {
    const authToken = await getAuthToken();
    const companyName = process.env.COMPANY_NAME;
    return await getProductDataFromAPI(companyName, categoryName, 0, Infinity, null, authToken, top);
};

const getPaginatedProductsByCategory = async (categoryName, top, page) => {
    const authToken = await getAuthToken();
    const companyName = process.env.COMPANY_NAME;
    const startIndex = (page - 1) * top;
    const endIndex = startIndex + top;

    const allProducts = await getProductDataFromAPI(companyName, categoryName, 0, Infinity, null, authToken, Infinity);
    const totalCount = allProducts.length;

    const paginatedProducts = allProducts.slice(startIndex, endIndex);

    return {
        products: paginatedProducts,
        totalCount
    };
};

const getSpecificProduct = async (categoryName, productId) => {
    const authToken = await getAuthToken();
    const companyName = process.env.COMPANY_NAME;
    try {
        const product = await getProductDataFromAPI(companyName, categoryName, 0, Infinity, productId, authToken);
        return product;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return null; // Product not found
        }
        throw error;
    }
};

module.exports = {
    getTopProductsByCategory,
    getPaginatedProductsByCategory,
    getSpecificProduct
};