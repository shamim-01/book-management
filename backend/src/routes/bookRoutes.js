const express = require('express');
const router = express.Router();

// ✅ সঠিকভাবে import করুন
const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');

// ✅ Check: console.log করে দেখুন ফাংশন আসছে কিনা
console.log('📦 Book Controller Functions:');
console.log('getBooks:', typeof getBooks);
console.log('createBook:', typeof createBook);

// Routes
router
  .route('/')
  .get(getBooks) // ✅ getBooks ফাংশন হওয়া উচিত
  .post(createBook); // ✅ createBook ফাংশন হওয়া উচিত

router
  .route('/:id')
  .get(getBook) // ✅ getBook ফাংশন হওয়া উচিত
  .put(updateBook) // ✅ updateBook ফাংশন হওয়া উচিত
  .delete(deleteBook); // ✅ deleteBook ফাংশন হওয়া উচিত

module.exports = router;
