import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @ desc Fetch all products
// @ routes Get /api/products
// @ access  Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).populate('user', 'name email');
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
// @ desc create a product
// @ routes POST /api/products
// @ access  Private/admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample Brand',
        category: 'Sample Category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Description',
    });
    const createdProduct = await product.save();
    res.status(200).json(createdProduct);
});

// @ desc Update a products
// @ routes PUT /api/products
// @ access  PRIVATE/ADMIN
const updateProducts = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;

    const product = await Product.findById(req.params.id);
    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product Not Found');
    }
});
// @ desc Delete a products
// @ routes DELETE /api/products
// @ access  PRIVATE/ADMIN
const deleteProducts = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await Product.deleteOne({ _id: product._id });
        res.status(200).json({ message: 'Product Deleted' });
    } else {
        res.status(404);
        throw new Error('Product Not Found');
    }
});

// exports
export { getProducts, getProductById, createProduct, updateProducts, deleteProducts };
