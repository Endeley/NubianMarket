import express from 'express';
const router = express.Router();
import { registerUser, getUsers, loginUser, logoutUser, getUserProfile, updateUserProfile, deleteUser, getUserByID, updateUser } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserByID).put(protect, admin, updateUser);

export default router;
