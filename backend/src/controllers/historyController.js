const ReadingHistory = require('../models/ReadingHistory');
const Book = require('../models/Book');

// @desc    Get reading history
// @route   GET /api/history
// @access  Private
exports.getHistory = async (req, res) => {
  try {
    const history = await ReadingHistory.find({ user: req.user.id })
      .populate('book')
      .sort({ startedDate: -1 });

    res.status(200).json({
      success: true,
      count: history.length,
      history,
    });
  } catch (error) {
    console.error('❌ Get history error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Add to reading history
// @route   POST /api/history
// @access  Private
exports.addHistory = async (req, res) => {
  try {
    const { bookId, status, pagesRead } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    const history = await ReadingHistory.create({
      user: req.user.id,
      book: bookId,
      status: status || 'reading',
      pagesRead: pagesRead || 0,
    });

    res.status(201).json({
      success: true,
      message: 'Added to reading history',
      history,
    });
  } catch (error) {
    console.error('❌ Add history error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update reading history
// @route   PUT /api/history/:id
// @access  Private
exports.updateHistory = async (req, res) => {
  try {
    const { rating, review, pagesRead, status, finishedDate } = req.body;

    const history = await ReadingHistory.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!history) {
      return res.status(404).json({
        success: false,
        message: 'History not found',
      });
    }

    if (rating !== undefined) history.rating = rating;
    if (review) history.review = review;
    if (pagesRead !== undefined) history.pagesRead = pagesRead;
    if (status) history.status = status;
    if (finishedDate) history.finishedDate = finishedDate;
    if (status === 'completed' && !history.finishedDate) {
      history.finishedDate = new Date();
    }

    await history.save();

    res.status(200).json({
      success: true,
      message: 'History updated!',
      history,
    });
  } catch (error) {
    console.error('❌ Update history error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete reading history
// @route   DELETE /api/history/:id
// @access  Private
exports.deleteHistory = async (req, res) => {
  try {
    const history = await ReadingHistory.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!history) {
      return res.status(404).json({
        success: false,
        message: 'History not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'History deleted',
    });
  } catch (error) {
    console.error('❌ Delete history error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get reading statistics
// @route   GET /api/history/stats
// @access  Private
exports.getReadingStats = async (req, res) => {
  try {
    const history = await ReadingHistory.find({ user: req.user.id });

    const totalBooks = history.length;
    const completed = history.filter(h => h.status === 'completed').length;
    const reading = history.filter(h => h.status === 'reading').length;

    const totalPages = history.reduce((sum, h) => sum + (h.pagesRead || 0), 0);
    const avgRating =
      history.filter(h => h.rating).reduce((sum, h) => sum + h.rating, 0) /
      (history.filter(h => h.rating).length || 1);

    // Genre distribution
    const books = await Book.find({
      _id: { $in: history.map(h => h.book) },
    });

    const genreCount = {};
    books.forEach(book => {
      const genre = book.genre || 'Uncategorized';
      genreCount[genre] = (genreCount[genre] || 0) + 1;
    });

    res.status(200).json({
      success: true,
      stats: {
        totalBooks,
        completed,
        reading,
        totalPages,
        avgRating: avgRating.toFixed(1),
        genreDistribution: genreCount,
        favoriteGenre: Object.keys(genreCount).reduce(
          (a, b) => (genreCount[a] > genreCount[b] ? a : b),
          '',
        ),
      },
    });
  } catch (error) {
    console.error('❌ Get stats error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
