const Book = require('../models/Book');

// ✅ getBooks ফাংশনটি সঠিকভাবে export হয়েছে কিনা চেক করুন
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ getBook ফাংশন
exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ createBook ফাংশন
exports.createBook = async (req, res) => {
  try {
    console.log('📝 Creating book:', req.body);

    if (!req.body.title || !req.body.author) {
      return res.status(400).json({
        success: false,
        message: 'Title and author are required',
      });
    }

    const book = await Book.create(req.body);
    console.log('✅ Book created:', book);

    res.status(201).json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.error('❌ Error:', error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'ISBN already exists',
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ updateBook ফাংশন
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ deleteBook ফাংশন
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    await book.deleteOne();
    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// backend/src/controllers/bookController.js

// Advanced search with filters
exports.searchBooks = async (req, res) => {
  try {
    const {
      q, // Search query
      genre,
      minPrice,
      maxPrice,
      year,
      page = 1,
      limit = 10,
      sort = '-createdAt',
    } = req.query;

    // Build search query
    const query = {};

    // Text search
    if (q) {
      query.$text = { $search: q };
    }

    // Filter by genre
    if (genre) {
      query.genre = genre;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Filter by year
    if (year) {
      query.publishedYear = parseInt(year);
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const books = await Book.find(query)
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip)
      .populate('reviews', 'rating comment');

    const total = await Book.countDocuments(query);

    res.status(200).json({
      success: true,
      data: books,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
