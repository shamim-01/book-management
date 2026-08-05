const mongoose = require('mongoose');

const ReadingHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    startedDate: {
      type: Date,
      default: Date.now,
    },
    finishedDate: {
      type: Date,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    review: {
      type: String,
    },
    pagesRead: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['reading', 'completed', 'abandoned'],
      default: 'reading',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('ReadingHistory', ReadingHistorySchema);
