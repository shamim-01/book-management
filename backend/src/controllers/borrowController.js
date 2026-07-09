const Borrow = require('../models/Borrow');
const Book = require('../models/Book');

// @desc    Borrow a book
exports.borrowBook = async (req, res) => {
  try {
    const { bookId, borrowerName, borrowerEmail, dueDate, notes } = req.body;

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    // Check if book is available
    if (!book.isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'Book is not available for borrowing',
      });
    }

    // Calculate due date (default 14 days from now)
    const dueDateObj = dueDate
      ? new Date(dueDate)
      : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

    // Create borrow record
    const borrow = await Borrow.create({
      book: bookId,
      borrowerName,
      borrowerEmail,
      dueDate: dueDateObj,
      notes,
    });

    // Update book availability
    await Book.findByIdAndUpdate(bookId, {
      isAvailable: false,
      $inc: { borrowCount: 1 },
    });

    // Populate book details
    await borrow.populate('book', 'title author genre price');

    res.status(201).json({
      success: true,
      data: borrow,
    });
  } catch (error) {
    console.error('❌ Borrow error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Return a book
exports.returnBook = async (req, res) => {
  try {
    const borrow = await Borrow.findById(req.params.id);

    if (!borrow) {
      return res.status(404).json({
        success: false,
        message: 'Borrow record not found',
      });
    }

    if (borrow.status === 'returned') {
      return res.status(400).json({
        success: false,
        message: 'Book already returned',
      });
    }

    // Calculate fine if overdue
    const today = new Date();
    let fine = 0;
    if (today > borrow.dueDate) {
      const daysOverdue = Math.ceil(
        (today - borrow.dueDate) / (1000 * 60 * 60 * 24),
      );
      fine = daysOverdue * 5; // $5 per day fine
    }

    // Update borrow record
    borrow.returnDate = today;
    borrow.status = 'returned';
    borrow.fine = fine;
    await borrow.save();

    // Update book availability
    await Book.findByIdAndUpdate(borrow.book, { isAvailable: true });

    res.status(200).json({
      success: true,
      data: borrow,
      message:
        fine > 0
          ? `Book returned with fine $${fine}`
          : 'Book returned successfully',
    });
  } catch (error) {
    console.error('❌ Return error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all borrow records
exports.getBorrows = async (req, res) => {
  try {
    const borrows = await Borrow.find()
      .populate('book', 'title author genre price')
      .sort({ borrowDate: -1 });

    res.status(200).json({
      success: true,
      count: borrows.length,
      data: borrows,
    });
  } catch (error) {
    console.error('❌ Get borrows error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get borrow records by book
exports.getBorrowsByBook = async (req, res) => {
  try {
    const borrows = await Borrow.find({
      book: req.params.bookId,
    }).sort({ borrowDate: -1 });

    res.status(200).json({
      success: true,
      count: borrows.length,
      data: borrows,
    });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get active borrows
exports.getActiveBorrows = async (req, res) => {
  try {
    const borrows = await Borrow.find({
      status: 'borrowed',
    })
      .populate('book', 'title author')
      .sort({ dueDate: 1 });

    res.status(200).json({
      success: true,
      count: borrows.length,
      data: borrows,
    });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
