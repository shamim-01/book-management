// backend/src/routes/challengeRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getChallenge,
  createChallenge,
  updateChallenge,
  deleteChallenge,
} = require('../controllers/challengeController');

router.get('/', protect, getChallenge);
router.post('/', protect, createChallenge);
router.put('/:id', protect, updateChallenge);
router.delete('/:id', protect, deleteChallenge);

module.exports = router;
