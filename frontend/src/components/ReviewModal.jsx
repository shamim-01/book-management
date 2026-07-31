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
    <div className="fixed inset-0 bg-[#132018]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#F7F3E9] rounded-sm max-w-md w-full p-6 shadow-2xl border border-[#B08D57]/25 relative overflow-hidden">
        {/* Book-spine texture bars */}
        <div className="absolute inset-0 flex opacity-[0.05] pointer-events-none">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 border-r border-[#B08D57]"
              style={{
                backgroundColor: i % 3 === 0 ? '#B08D57' : 'transparent',
              }}
            />
          ))}
        </div>

        <div className="relative">
          <div className="flex justify-between items-center mb-4 border-b border-[#B08D57]/30 pb-4">
            <h2 className="font-serif text-2xl font-bold text-[#1F2E24] flex items-center gap-2">
              <span className="text-[#B08D57]">★</span> Write a Review
            </h2>
            <button
              onClick={onClose}
              className="text-[#8A7F68] hover:text-[#1F2E24] transition"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          <div className="mb-4 p-4 bg-white/60 border border-[#B08D57]/20 rounded-sm">
            <p className="font-serif font-semibold text-[#1F2E24]">
              {book.title}
            </p>
            <p className="text-sm text-[#8A7F68]">by {book.author}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#5B5347] uppercase tracking-wide mb-2">
                Your Rating *
              </label>
              <RatingStars rating={rating} onRatingChange={setRating} />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#5B5347] uppercase tracking-wide mb-2">
                Your Review *
              </label>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                rows="4"
                className="w-full px-4 py-3 border border-[#B08D57]/30 rounded-sm
                         focus:ring-2 focus:ring-[#3F6B4F]/20 focus:border-[#3F6B4F]
                         bg-white/70 text-[#2A2A24] placeholder:text-[#8A7F68]/60 transition outline-none"
                placeholder="Share your thoughts about this book..."
                required
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#B08D57] text-[#132018] py-3 rounded-sm
                         hover:bg-[#C7A56C] transition font-semibold tracking-wide
                         shadow-md disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Review'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-transparent border border-[#B08D57]/40 text-[#5B5347] py-3 rounded-sm
                         hover:bg-[#B08D57]/10 transition font-semibold tracking-wide"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
