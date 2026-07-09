const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    borrowerName: {
      type: String,
      required: [true, 'Please add borrower name'],
      trim: true,
    },
    borrowerEmail: {
      type: String,
      required: [true, 'Please add borrower email'],
      lowercase: true,
      trim: true,
    },
    borrowDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['borrowed', 'returned', 'overdue'],
      default: 'borrowed',
    },
    fine: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      maxlength: [200, 'Notes cannot be more than 200 characters'],
    },
  },
  {
    timestamps: true,
  },
);

// Index for faster queries
borrowSchema.index({ book: 1, status: 1 });
borrowSchema.index({ borrowerEmail: 1, status: 1 });

module.exports = mongoose.model('Borrow', borrowSchema);
