const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getHistory,
  addHistory,
  updateHistory,
  deleteHistory,
  getReadingStats,
} = require('../controllers/historyController');

router.get('/', protect, getHistory);
router.get('/stats', protect, getReadingStats);
router.post('/', protect, addHistory);
router.put('/:id', protect, updateHistory);
router.delete('/:id', protect, deleteHistory);

module.exports = router;
