// backend/src/models/ReadingChallenge.js
const mongoose = require('mongoose');

const ReadingChallengeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    year: {
      type: Number,
      required: true,
      default: new Date().getFullYear(),
    },
    target: {
      type: Number,
      required: true,
      default: 50,
    },
    current: {
      type: Number,
      default: 0,
    },
    progress: {
      type: Number,
      default: 0,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

// one year challagene
ReadingChallengeSchema.index({ user: 1, year: 1 }, { unique: true });

module.exports = mongoose.model('ReadingChallenge', ReadingChallengeSchema);
