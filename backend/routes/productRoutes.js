import express from 'express';
import { getProductById, getProducts, createProduct, updateProducts, deleteProducts } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

//

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id').get(getProductById).put(protect, admin, updateProducts).delete(protect, admin, deleteProducts);

export default router;
