const express = require('express');
const router = express.Router();
const {
  addReview,
  getReviews,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

// ✅ Public routes
router.get('/:bookId', getReviews);

// ✅ Protected routes
router.post('/:bookId', protect, addReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;
