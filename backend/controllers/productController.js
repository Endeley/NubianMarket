import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @ desc Fetch all products
// @ routes Get /api/products
// @ access  Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// @ desc Fetch a single product
// @ routes Get /api/products/:id
// @ access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id); // Corrected key
    if (product) {
        return res.json(product);
    } else {
        res.status(404);
        throw new Error('Resource Not Found');
    }
});

export { getProducts, getProductById };
