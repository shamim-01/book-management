const Wishlist = require('../models/Wishlist');
const Book = require('../models/Book');

// @desc    Get user's wishlist
// @route   GET /api/wishlist
// @access  Private
exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ user: req.user.id })
      .populate('book')
      .sort({ addedAt: -1 });

    res.status(200).json({
      success: true,
      count: wishlist.length,
      wishlist,
    });
  } catch (error) {
    console.error('❌ Get wishlist error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Add to wishlist
// @route   POST /api/wishlist/:bookId
// @access  Private
exports.addToWishlist = async (req, res) => {
  try {
    const { bookId } = req.params;

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    // Check if already in wishlist
    const existing = await Wishlist.findOne({
      user: req.user.id,
      book: bookId,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Book already in wishlist',
      });
    }

    // Add to wishlist
    const wishlist = await Wishlist.create({
      user: req.user.id,
      book: bookId,
    });

    res.status(201).json({
      success: true,
      message: 'Added to wishlist ❤️',
      wishlist,
    });
  } catch (error) {
    console.error('❌ Add to wishlist error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Remove from wishlist
// @route   DELETE /api/wishlist/:bookId
// @access  Private
exports.removeFromWishlist = async (req, res) => {
  try {
    const { bookId } = req.params;

    const wishlist = await Wishlist.findOneAndDelete({
      user: req.user.id,
      book: bookId,
    });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: 'Book not in wishlist',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Removed from wishlist',
    });
  } catch (error) {
    console.error('❌ Remove from wishlist error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Check if book is in wishlist
// @route   GET /api/wishlist/check/:bookId
// @access  Private
exports.checkWishlist = async (req, res) => {
  try {
    const { bookId } = req.params;

    const wishlist = await Wishlist.findOne({
      user: req.user.id,
      book: bookId,
    });

    res.status(200).json({
      success: true,
      inWishlist: !!wishlist,
    });
  } catch (error) {
    console.error('❌ Check wishlist error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
