const express = require('express');
const router = express.Router();

// import
const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');


console.log('📦 Book Controller Functions:');
console.log('getBooks:', typeof getBooks);
console.log('createBook:', typeof createBook);

// Routes
router
  .route('/')
  .get(getBooks) 
  .post(createBook); 

router
  .route('/:id')
  .get(getBook) 
  .put(updateBook) 
  .delete(deleteBook);

module.exports = router;
