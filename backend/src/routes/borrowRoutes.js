const express = require('express');
const router = express.Router();
const {
  borrowBook,
  returnBook,
  getBorrows,
  getBorrowsByBook,
  getActiveBorrows,
} = require('../controllers/borrowController');

// @route   GET /api/borrow
// @desc    Get all borrow records
router.get('/', getBorrows);

// @route   GET /api/borrow/active
// @desc    Get active borrows
router.get('/active', getActiveBorrows);

// @route   GET /api/borrow/book/:bookId
// @desc    Get borrows by book
router.get('/book/:bookId', getBorrowsByBook);

// @route   POST /api/borrow
// @desc    Borrow a book
router.post('/', borrowBook);

// @route   PUT /api/borrow/:id/return
// @desc    Return a book
router.put('/:id/return', returnBook);

module.exports = router;
