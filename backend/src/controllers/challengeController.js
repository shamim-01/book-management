// backend/src/controllers/challengeController.js
const ReadingChallenge = require('../models/ReadingChallenge');

// @desc    Get user's reading challenge
// @route   GET /api/challenge
// @access  Private
exports.getChallenge = async (req, res) => {
  try {
    const year = req.query.year || new Date().getFullYear();

    const challenge = await ReadingChallenge.findOne({
      user: req.user.id,
      year,
    });

    res.status(200).json({
      success: true,
      challenge,
    });
  } catch (error) {
    console.error('❌ Get challenge error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create reading challenge
// @route   POST /api/challenge
// @access  Private
exports.createChallenge = async (req, res) => {
  try {
    const { target, year } = req.body;

    // Check if already exists
    const existing = await ReadingChallenge.findOne({
      user: req.user.id,
      year: year || new Date().getFullYear(),
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Challenge already exists for this year',
      });
    }

    const challenge = await ReadingChallenge.create({
      user: req.user.id,
      target: target || 50,
      year: year || new Date().getFullYear(),
    });

    res.status(201).json({
      success: true,
      message: 'Reading challenge created! 📚',
      challenge,
    });
  } catch (error) {
    console.error('❌ Create challenge error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update reading challenge
// @route   PUT /api/challenge/:id
// @access  Private
exports.updateChallenge = async (req, res) => {
  try {
    const { target, current } = req.body;

    const challenge = await ReadingChallenge.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found',
      });
    }

    if (target) challenge.target = target;
    if (current !== undefined) {
      challenge.current = current;
      challenge.progress = (current / challenge.target) * 100;
      challenge.isCompleted = challenge.progress >= 100;
      if (challenge.isCompleted) {
        challenge.completedAt = new Date();
      }
    }

    await challenge.save();

    res.status(200).json({
      success: true,
      message: 'Challenge updated!',
      challenge,
    });
  } catch (error) {
    console.error('❌ Update challenge error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete reading challenge
// @route   DELETE /api/challenge/:id
// @access  Private
exports.deleteChallenge = async (req, res) => {
  try {
    const challenge = await ReadingChallenge.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Challenge deleted',
    });
  } catch (error) {
    console.error('❌ Delete challenge error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
