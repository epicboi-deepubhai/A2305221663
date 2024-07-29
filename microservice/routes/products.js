const express = require('express');
const { getProducts, getProductDetails } = require('../controllers/productsController');

const router = express.Router({ mergeParams: true });

router.get('/', getProducts);
router.get('/:productid', getProductDetails);

module.exports = router;
