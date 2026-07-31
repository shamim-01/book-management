// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
  forgotPassword,
  verifyOTP,
  resetPassword,
  updateProfile,
  changePassword,
  deleteAccount,
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPassword);

// Protected routes (require authentication)
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);
router.delete('/account', protect, deleteAccount);

module.exports = router;
