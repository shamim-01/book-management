const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  checkWishlist,
} = require('../controllers/wishlistController');

router.get('/', protect, getWishlist);
router.post('/:bookId', protect, addToWishlist);
router.delete('/:bookId', protect, removeFromWishlist);
router.get('/check/:bookId', protect, checkWishlist);

module.exports = router;
