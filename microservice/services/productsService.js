const { getProductDataFromAPI, getAuthToken } = require('../utils/db');

const getProducts = async (companyname, categoryname, minPrice, maxPrice, top) => {
    const authToken = await getAuthToken();
    return await getProductDataFromAPI(companyname, categoryname, minPrice, maxPrice, null, authToken, top);
};

const getProductDetails = async (companyname, categoryname, productid) => {
    const authToken = await getAuthToken();
    return await getProductDataFromAPI(companyname, categoryname, 0, Infinity, productid, authToken);
};

module.exports = {
    getProducts,
    getProductDetails
};