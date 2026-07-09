import React, { useState } from 'react';
import toast from 'react-hot-toast';
import RatingStars from './RatingStars';
import { FaTimes } from 'react-icons/fa';
import { createReview } from '../services/api';

const ReviewModal = ({ book, onClose, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (!comment.trim()) {
      toast.error('Please write a comment');
      return;
    }

    setLoading(true);
    try {
      await createReview(book._id, { rating, comment });
      toast.success('Review added successfully! 🎉');
      onReviewAdded();
      onClose();
    } catch (error) {
      console.error('❌ Review error:', error);
      toast.error(error.response?.data?.message || 'Failed to add review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-dark-800 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 dark:border-dark-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            ⭐ Write a Review
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="mb-4 p-3 bg-gray-50 dark:bg-dark-700 rounded-xl">
          <p className="font-semibold text-gray-800 dark:text-white">
            {book.title}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            by {book.author}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Rating *
            </label>
            <RatingStars rating={rating} onRatingChange={setRating} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Review *
            </label>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              rows="4"
              className="w-full px-4 py-3 border border-gray-200 dark:border-dark-600 rounded-xl 
                       focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                       bg-white dark:bg-dark-900 text-gray-800 dark:text-white transition"
              placeholder="Share your thoughts about this book..."
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 rounded-xl 
                       hover:from-indigo-700 hover:to-indigo-800 transition font-medium 
                       shadow-md disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl 
                       hover:bg-gray-300 dark:hover:bg-dark-600 transition font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
