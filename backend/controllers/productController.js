import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @ desc Fetch all products
// @ routes Get /api/products
// @ access  Public
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 8;
    const page = isNaN(Number(req.query.pageNumber)) ? 1 : Number(req.query.pageNumber);
    const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : {};

    try {
        const count = await Product.countDocuments({ ...keyword });
        const products = await Product.find({ ...keyword })
            .populate('user', 'name email')
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.json({ products, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error' });
    }
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

// @ desc CREATE A NEW REVIEW
// @ routes POST /api/products/:id/reviews
// @ access  PRIVATE
const createProductReview = asyncHandler(async (req, res) => {
    //
    const { rating, comment } = req.body;
    //
    const product = await Product.findById(req.params.id);
    //

    if (product) {
        const alreadyReviewed = product.reviews.find((review) => review.user.toString() === req.user._id.toString());

        if (alreadyReviewed) {
            res.status(400);
            throw new Error('product already reviewed ');
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;
        await product.save();
        res.status(201).json({ message: 'Review Added' });
    } else {
        res.status(404);
        throw new Error('Product Not Found');
    }
});

//
// @desc Get Top Products
// @route GET /api/products/top
// @access Public
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(12);
    res.status(200).json(products);
});
// exports
export { getProducts, getProductById, createProduct, updateProducts, deleteProducts, createProductReview, getTopProducts };
