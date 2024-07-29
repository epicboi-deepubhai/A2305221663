require('dotenv').config();
const axios = require('axios');

const AUTH_URL = process.env.AUTH_URL;
const COMPANY_NAME = process.env.COMPANY_NAME;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const OWNER_NAME = process.env.OWNER_NAME;
const OWNER_EMAIL = process.env.OWNER_EMAIL;
const ROLL_NO = process.env.ROLL_NO;

const getAuthToken = async () => {
    try {
        console.log('Requesting auth token...');
        const response = await axios.post(AUTH_URL, {
            companyName: COMPANY_NAME,
            clientID: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            ownerName: OWNER_NAME,
            ownerEmail: OWNER_EMAIL,
            rollNo: ROLL_NO
        });
        console.log('Auth token received:', response.data);
        return response.data.access_token;
    } catch (error) {
        console.error('Error obtaining auth token:', error.response ? error.response.data : error.message);
        throw new Error('Failed to obtain auth token');
    }
};

const MAX_PRICE = 1000000000; // Use a large number instead of Infinity

const getProductDataFromAPI = async (companyname, categoryname, minPrice = 0, maxPrice = MAX_PRICE, productid = null, authToken, top = 10) => {
    try {
        const domain = `http://20.244.56.144/test/companies/${companyname}/categories/${categoryname}/products`;

        const config = {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        };

        if (productid) {
            // Fetch product details by product ID
            console.log(`Fetching product details for product ID: ${productid}`);
            const response = await axios.get(`${domain}/${productid}`, config);
            return response.data;
        } else {
            // Fetch product data based on category and price range
            console.log(`Fetching products for category: ${categoryname}, minPrice: ${minPrice}, maxPrice: ${maxPrice}, top: ${top}`);
            const response = await axios.get(domain, {
                ...config,
                params: {
                    minPrice: Math.max(0, minPrice),
                    maxPrice: Math.min(MAX_PRICE, maxPrice),
                    top: top === Infinity ? undefined : Math.max(1, top)
                }
            });
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching product data:', error.response ? error.response.data : error.message);
        if (error.response && error.response.status === 404) {
            return null; // Product not found
        }
        throw new Error('Failed to fetch product data');
    }
};

module.exports = { getProductDataFromAPI, getAuthToken };