require('dotenv').config();
const express = require('express');
const productsController = require('./controllers/productsController');
const categoryController = require('./controllers/categoryController');

const app = express();
const port = process.env.PORT || 3000;

app.get('/companies/:companyname/categories/:categoryname/products', productsController.getProducts);
app.get('/companies/:companyname/categories/:categoryname/products/:productid', productsController.getProductDetails);
app.get('/categories/:categoryName/products', categoryController.getTopProductsByCategory);
app.get('/categories/:categoryName/products/:productId', categoryController.getSpecificProduct);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});