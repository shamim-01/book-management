const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/dashboardController');

// @route   GET /api/dashboard/stats
// @desc    Get dashboard statistics
router.get('/stats', getStats);

module.exports = router;
