const mongoose = require('mongoose'); // ✅ এই লাইন যোগ করুন
const Review = require('../models/Review');
const Book = require('../models/Book');

// @desc    Add review
// @route   POST /api/reviews/:bookId
// @access  Private
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const bookId = req.params.bookId;
    const userId = req.user.id;

    console.log('📝 Adding review:', { bookId, userId, rating, comment });

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    // Check if user already reviewed
    const existingReview = await Review.findOne({
      book: bookId,
      user: userId,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You already reviewed this book',
      });
    }

    // Create review
    const review = await Review.create({
      book: bookId,
      user: userId,
      rating,
      comment,
    });

    // Populate user info
    await review.populate('user', 'name');

    // Update book average rating
    await updateBookRating(bookId);

    console.log('✅ Review added:', review._id);

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (error) {
    console.error('❌ Add review error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get reviews for a book
// @route   GET /api/reviews/:bookId
// @access  Public
exports.getReviews = async (req, res) => {
  try {
    const bookId = req.params.bookId;

    const reviews = await Review.find({ book: bookId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    // Get average rating
    const avgRating = await Review.aggregate([
      { $match: { book: new mongoose.Types.ObjectId(bookId) } },
      {
        $group: { _id: null, average: { $avg: '$rating' }, count: { $sum: 1 } },
      },
    ]);

    res.status(200).json({
      success: true,
      count: reviews.length,
      average: avgRating[0]?.average || 0,
      data: reviews,
    });
  } catch (error) {
    console.error('❌ Get reviews error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
exports.updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const reviewId = req.params.id;
    const userId = req.user.id;

    let review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    // Check if user owns the review
    if (review.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this review',
      });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    await review.save();

    // Update book rating
    await updateBookRating(review.book);

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    console.error('❌ Update review error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
exports.deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user.id;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    // Check if user owns the review
    if (review.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this review',
      });
    }

    const bookId = review.book;
    await review.deleteOne();

    // Update book rating
    await updateBookRating(bookId);

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    console.error('❌ Delete review error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Helper function to update book average rating
const updateBookRating = async bookId => {
  const result = await Review.aggregate([
    { $match: { book: new mongoose.Types.ObjectId(bookId) } },
    {
      $group: { _id: null, avgRating: { $avg: '$rating' }, count: { $sum: 1 } },
    },
  ]);

  const avgRating = result[0]?.avgRating || 0;
  const count = result[0]?.count || 0;

  await Book.findByIdAndUpdate(bookId, {
    averageRating: Math.round(avgRating * 10) / 10,
    reviewsCount: count,
  });
};
