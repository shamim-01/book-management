// backend/src/models/Wishlist.js
const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema(
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
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

// এক ইউজার এক বই একবারই wishlist এ যোগ করতে পারবে
WishlistSchema.index({ user: 1, book: 1 }, { unique: true });

module.exports = mongoose.model('Wishlist', WishlistSchema);
