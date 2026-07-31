const Book = require('../models/Book');
const Borrow = require('../models/Borrow');
const mongoose = require('mongoose');

// @desc    Get dashboard stats
exports.getStats = async (req, res) => {
  try {
    console.log('📊 ===== DASHBOARD STATS =====');

    // ✅ Check MongoDB Connection
    const db = mongoose.connection;
    console.log('📊 MongoDB Connection State:', db.readyState);
    console.log('📊 Database Name:', db.name);

    // ✅ Method 1: Direct MongoDB Query (Most Reliable)
    const dbInstance = mongoose.connection.db;
    const collection = dbInstance.collection('books');

    // Count using MongoDB native driver
    const totalBooksNative = await collection.countDocuments();
    console.log('📚 Native Count:', totalBooksNative);

    // ✅ Method 2: Mongoose countDocuments
    const totalBooksMongoose = await Book.countDocuments();
    console.log('📚 Mongoose Count:', totalBooksMongoose);

    // ✅ Method 3: Find all books (to verify)
    const allBooks = await Book.find().select('title author isAvailable');
    console.log('📚 All Books Found:', allBooks.length);
    console.log('📚 Book Titles:', allBooks.map(b => b.title).join(', '));

    // Count available books
    const availableBooks = await Book.countDocuments({ isAvailable: true });
    console.log('✅ Available Books:', availableBooks);

    // Count total borrows
    let totalBorrows = 0;
    try {
      totalBorrows = await Borrow.countDocuments();
    } catch (error) {
      console.log('ℹ️ Borrow collection not found:', error.message);
    }
    console.log('📖 Total Borrows:', totalBorrows);

    // Count active borrows
    let activeBorrows = 0;
    try {
      activeBorrows = await Borrow.countDocuments({ status: 'borrowed' });
    } catch (error) {
      console.log('ℹ️ No active borrows');
    }
    console.log('🔄 Active Borrows:', activeBorrows);

    // Genre distribution
    const genreStats = await Book.aggregate([
      {
        $group: {
          _id: '$genre',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);
    console.log('📊 Genre Stats:', JSON.stringify(genreStats, null, 2));

    // Recent Books
    const recentBooks = await Book.find().sort({ createdAt: -1 }).limit(5);
    console.log('📚 Recent Books:', recentBooks.map(b => b.title).join(', '));

    // Send Response with both counts for debugging
    res.status(200).json({
      success: true,
      data: {
        totalBooks: totalBooksMongoose || 0,
        totalBooksNative: totalBooksNative || 0, // Debug
        availableBooks: availableBooks || 0,
        totalBorrows: totalBorrows || 0,
        activeBorrows: activeBorrows || 0,
        genreStats: genreStats || [],
        recentBooks: recentBooks || [],
        allBooks: allBooks || [], // Debug
        databaseName: db.name,
        connectionState: db.readyState,
      },
    });
  } catch (error) {
    console.error('❌ Dashboard Error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};
