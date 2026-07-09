const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a book title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    author: {
      type: String,
      required: [true, 'Please add an author name'],
      trim: true,
    },
    isbn: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    genre: {
      type: String,
      enum: [
        'Fiction',
        'Non-Fiction',
        'Science',
        'History',
        'Biography',
        'Other',
      ],
      default: 'Other',
    },
    publishedYear: {
      type: Number,
      min: 1000,
      max: new Date().getFullYear(),
      validate: {
        validator: function (v) {
          return (
            v === undefined ||
            v === null ||
            (v >= 1000 && v <= new Date().getFullYear())
          );
        },
        message: 'Published year must be between 1000 and current year',
      },
    },
    price: {
      type: Number,
      min: 0,
      default: 0,
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot be more than 500 characters'],
      default: '',
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    borrowCount: {
      type: Number,
      default: 0,
    },
    coverImage: {
      type: String,
      default: '',
    },
    // ✅ এই ফিল্ডগুলো রাখুন (Virtual না করে Real Field হিসেবে)
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// ✅ Index for search
bookSchema.index({ title: 'text', author: 'text' });

// ✅ Remove virtual definitions (কারণ আমরা Real Field ব্যবহার করছি)
// bookSchema.virtual('averageRating').get(function () { ... });
// bookSchema.virtual('reviewsCount').get(function () { ... });

// Enable virtuals in JSON (যদি কোনো virtual থাকে)
bookSchema.set('toJSON', { virtuals: true });
bookSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Book', bookSchema, 'books');
