// components/BookCard.js
import React, { useState, useEffect } from 'react';
import BorrowModal from './BorrowModal';
import ReviewModal from './ReviewModal';
import {
  FaEdit,
  FaTrash,
  FaBookOpen,
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaHeart,
  FaRegHeart,
  FaSpinner,
  FaBookReader,
  FaCheckCircle,
  FaClock,
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import { addHistory, updateHistory, getHistory } from '../services/api';

// Import local images
import book1 from '../images/book1.jpg';
import book2 from '../images/book2.jpg';
import book3 from '../images/book3.jpg';
import book4 from '../images/book4.jpg';

// Fallback image if import fails
const fallbackImage =
  'https://dummyimage.com/400x300/3F6B4F/F7F3E9&text=No+Cover';

// Map book titles to specific images (optional)
const getImageForBook = title => {
  const imageMap = {
    'The Great Gatsby': book1,
    1984: book2,
    'To Kill a Mockingbird': book3,
    'The Alchemist': book4,
  };

  if (imageMap[title]) {
    return imageMap[title];
  }

  const images = [book1, book2, book3, book4];
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

const BookCard = ({
  book,
  onDelete,
  onEdit,
  onBorrow,
  onReviewAdded,
  onAddToWishlist,
  onRemoveFromWishlist,
  isInWishlist = false,
  isAddingToWishlist = false,
}) => {
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // ✅ Reading History States
  const [readingState, setReadingState] = useState({
    status: null,
    historyId: null,
    pagesRead: 0,
    loading: false,
  });
  const [showProgressInput, setShowProgressInput] = useState(false);
  const [newPages, setNewPages] = useState(0);

  if (!book) {
    return null;
  }

  const {
    _id,
    title,
    author,
    genre,
    publishedYear,
    price,
    isAvailable,
    averageRating,
    coverImage,
  } = book;

  // ✅ Check reading status on mount
  useEffect(() => {
    checkReadingStatus();
  }, [_id]);

  const checkReadingStatus = async () => {
    try {
      const response = await getHistory();
      const history = response.data.history || [];
      const existing = history.find(h => h.book?._id === _id || h.book === _id);

      if (existing) {
        setReadingState({
          status: existing.status,
          historyId: existing._id,
          pagesRead: existing.pagesRead || 0,
          loading: false,
        });
      }
    } catch (error) {
      console.error('❌ Error checking reading status:', error);
    }
  };

  // ✅ Start Reading
  const handleStartReading = async () => {
    setReadingState(prev => ({ ...prev, loading: true }));
    try {
      const response = await addHistory({
        bookId: _id,
        status: 'reading',
      });
      setReadingState({
        status: 'reading',
        historyId: response.data.history._id,
        pagesRead: 0,
        loading: false,
      });
      toast.success('Started reading! 📖');
    } catch (error) {
      console.error('❌ Start reading error:', error);
      toast.error(error.response?.data?.message || 'Failed to start reading');
      setReadingState(prev => ({ ...prev, loading: false }));
    }
  };

  // ✅ Update Progress
  const handleUpdateProgress = async () => {
    if (!readingState.historyId || newPages <= 0) {
      toast.error('Please enter valid pages');
      return;
    }

    setReadingState(prev => ({ ...prev, loading: true }));
    try {
      await updateHistory(readingState.historyId, {
        pagesRead: readingState.pagesRead + newPages,
      });
      setReadingState(prev => ({
        ...prev,
        pagesRead: prev.pagesRead + newPages,
        loading: false,
      }));
      setShowProgressInput(false);
      setNewPages(0);
      toast.success(`📚 ${newPages} pages added!`);
    } catch (error) {
      console.error('❌ Update progress error:', error);
      toast.error('Failed to update progress');
      setReadingState(prev => ({ ...prev, loading: false }));
    }
  };

  // ✅ Finish Reading
  const handleFinishReading = async () => {
    setReadingState(prev => ({ ...prev, loading: true }));
    try {
      await updateHistory(readingState.historyId, {
        status: 'completed',
        finishedDate: new Date(),
      });
      setReadingState(prev => ({
        ...prev,
        status: 'completed',
        loading: false,
      }));
      toast.success('🎉 Book finished! Congratulations!');
    } catch (error) {
      console.error('❌ Finish reading error:', error);
      toast.error('Failed to finish book');
      setReadingState(prev => ({ ...prev, loading: false }));
    }
  };

  const handleBorrow = async borrowData => {
    console.log('📖 BookCard: Borrowing book:', borrowData);
    try {
      await onBorrow(borrowData);
      setShowBorrowModal(false);
    } catch (error) {
      console.error('❌ Borrow failed:', error);
      throw error;
    }
  };

  // Render stars with half star support
  const renderStars = (rating = 0) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-[#B08D57] text-xs" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <FaStarHalfAlt key={i} className="text-[#B08D57] text-xs" />,
        );
      } else {
        stars.push(<FaRegStar key={i} className="text-[#B08D57]/30 text-xs" />);
      }
    }
    return stars;
  };

  // Get the image source
  const getImageSrc = () => {
    if (coverImage && coverImage.trim() !== '') {
      return coverImage;
    }
    return getImageForBook(title);
  };

  // Handle Wishlist toggle
  const handleWishlistToggle = () => {
    if (isInWishlist) {
      onRemoveFromWishlist(_id);
    } else {
      onAddToWishlist(_id);
    }
  };

  // ✅ Render Reading Status Badge
  const renderReadingStatus = () => {
    if (readingState.status === 'completed') {
      return (
        <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
          <FaCheckCircle className="text-xs" /> Completed
        </span>
      );
    }
    if (readingState.status === 'reading') {
      return (
        <span className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
          <FaBookReader className="text-xs" /> Reading ({readingState.pagesRead}{' '}
          pages)
        </span>
      );
    }
    return null;
  };

  return (
    <>
      <div className="group bg-white/70 rounded-sm border border-[#B08D57]/25 hover:border-[#B08D57]/60 shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden transform hover:-translate-y-1.5">
        {/* Cover Image */}
        <div className="relative h-56 bg-[#132018] overflow-hidden">
          <img
            src={getImageSrc()}
            alt={title}
            className="w-full h-full object-cover opacity-95 group-hover:scale-110 group-hover:opacity-100 transition-transform duration-500"
            onError={e => {
              e.target.src = fallbackImage;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#132018]/60 via-transparent to-transparent"></div>

          {/* ✅ Reading Status Badge on Image */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            <span
              className={`px-3 py-1 text-[11px] font-medium uppercase tracking-wide rounded-full backdrop-blur-sm border ${
                isAvailable
                  ? 'bg-[#3F6B4F]/80 text-white border-white/20'
                  : 'bg-[#8A4A3A]/80 text-white border-white/20'
              }`}
            >
              {isAvailable ? 'Available' : 'Borrowed'}
            </span>
            {renderReadingStatus()}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            disabled={isAddingToWishlist}
            className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition disabled:opacity-50 hover:scale-110 transform duration-200"
            title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            {isAddingToWishlist ? (
              <FaSpinner className="animate-spin text-[#3F6B4F] text-lg" />
            ) : isInWishlist ? (
              <FaHeart className="text-red-500 text-lg" />
            ) : (
              <FaRegHeart className="text-[#6B6354] text-lg hover:text-red-500 transition" />
            )}
          </button>

          {/* Rating Badge on Image */}
          {averageRating > 0 && (
            <div className="absolute bottom-3 left-3 bg-[#132018]/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#B08D57]/30">
              <div className="flex items-center gap-1">
                <FaStar className="text-[#B08D57] text-xs" />
                <span className="text-white text-xs font-mono">
                  {averageRating.toFixed(1)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-5">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-serif text-lg font-bold text-[#1F2E24] line-clamp-2 flex-1">
              {title || 'Untitled'}
            </h3>
          </div>

          <p className="text-[#6B6354] text-sm mt-1 flex items-center gap-1">
            <span className="font-medium text-[#8A7F68]">by</span>
            <span className="text-[#2A2A24] font-medium">
              {author || 'Unknown Author'}
            </span>
          </p>

          <div className="flex items-center mt-2 gap-1">
            {renderStars(averageRating)}
            <span className="text-xs text-[#8A7F68] font-mono ml-1">
              ({averageRating ? averageRating.toFixed(1) : '0'})
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="text-[11px] uppercase tracking-wide bg-[#3F6B4F]/10 text-[#3F6B4F] px-2.5 py-1 rounded-full border border-[#3F6B4F]/25">
              {genre || 'Other'}
            </span>
            {publishedYear && (
              <span className="text-[11px] font-mono bg-[#B08D57]/10 text-[#8A6A2E] px-2.5 py-1 rounded-full border border-[#B08D57]/25">
                {publishedYear}
              </span>
            )}
            {price > 0 && (
              <span className="text-[11px] font-mono bg-[#B08D57]/15 text-[#8A6A2E] px-2.5 py-1 rounded-full border border-[#B08D57]/30 font-semibold">
                ${price}
              </span>
            )}
          </div>

          {/* ✅ Reading Action Buttons */}
          <div className="mt-3">
            {readingState.status === 'completed' ? (
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-sm p-2">
                <FaCheckCircle className="text-green-500" />
                <span className="text-sm text-green-700 font-medium">
                  ✅ Finished Reading
                </span>
              </div>
            ) : readingState.status === 'reading' ? (
              <div className="flex flex-wrap items-center gap-2 bg-blue-50 border border-blue-200 rounded-sm p-2">
                <FaBookReader className="text-blue-500" />
                <span className="text-sm text-blue-700 font-medium">
                  📖 Reading: {readingState.pagesRead} pages
                </span>
                {!showProgressInput ? (
                  <>
                    <button
                      onClick={() => setShowProgressInput(true)}
                      className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                    >
                      + Add Pages
                    </button>
                    <button
                      onClick={handleFinishReading}
                      disabled={readingState.loading}
                      className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition disabled:opacity-50"
                    >
                      {readingState.loading ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        'Finish'
                      )}
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-1 w-full mt-1">
                    <input
                      type="number"
                      value={newPages}
                      onChange={e => setNewPages(parseInt(e.target.value) || 0)}
                      className="w-20 px-2 py-1 border border-blue-300 rounded text-sm"
                      placeholder="Pages"
                      min="1"
                      autoFocus
                    />
                    <button
                      onClick={handleUpdateProgress}
                      disabled={readingState.loading}
                      className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition disabled:opacity-50"
                    >
                      {readingState.loading ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        'Add'
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setShowProgressInput(false);
                        setNewPages(0);
                      }}
                      className="text-xs border border-gray-300 px-2 py-1 rounded hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleStartReading}
                disabled={readingState.loading}
                className="w-full bg-[#3F6B4F] text-white px-3 py-2 rounded-sm hover:bg-[#345A42] transition-all duration-300 text-xs font-medium uppercase tracking-wide flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {readingState.loading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaBookReader className="text-xs" />
                )}
                Start Reading
              </button>
            )}
          </div>

          {/* Action Buttons - 5 Columns */}
          <div className="mt-3 grid grid-cols-5 gap-2">
            {isAvailable ? (
              <button
                onClick={() => setShowBorrowModal(true)}
                className="col-span-1 bg-[#3F6B4F] text-white px-3 py-2 rounded-sm hover:bg-[#345A42] transition-all duration-300 text-xs font-medium uppercase tracking-wide flex items-center justify-center gap-1"
              >
                <FaBookOpen className="text-xs" />
                <span className="hidden sm:inline">Borrow</span>
              </button>
            ) : (
              <button
                disabled
                className="col-span-1 bg-[#B08D57]/10 text-[#8A7F68] px-3 py-2 rounded-sm cursor-not-allowed text-xs font-medium uppercase tracking-wide flex items-center justify-center border border-[#B08D57]/15"
              >
                <span className="hidden sm:inline">Borrowed</span>
              </button>
            )}

            <button
              onClick={() => setShowReviewModal(true)}
              className="col-span-1 bg-[#B08D57] hover:bg-[#C7A56C] text-[#132018] px-3 py-2 rounded-sm transition-all duration-300 text-xs font-medium uppercase tracking-wide flex items-center justify-center gap-1"
            >
              <FaStar className="text-xs" />
              <span className="hidden sm:inline">Review</span>
            </button>

            <button
              onClick={handleWishlistToggle}
              disabled={isAddingToWishlist}
              className={`col-span-1 px-3 py-2 rounded-sm transition-all duration-300 text-xs font-medium uppercase tracking-wide flex items-center justify-center gap-1 ${
                isInWishlist
                  ? 'bg-red-50 border border-red-300 text-red-500 hover:bg-red-100'
                  : 'border border-[#B08D57]/30 text-[#6B6354] hover:bg-[#B08D57]/10'
              }`}
            >
              {isAddingToWishlist ? (
                <FaSpinner className="animate-spin" />
              ) : isInWishlist ? (
                <FaHeart className="text-xs" />
              ) : (
                <FaRegHeart className="text-xs" />
              )}
              <span className="hidden sm:inline">Wishlist</span>
            </button>

            <button
              onClick={() => onEdit(book)}
              className="col-span-1 border border-[#3F6B4F] text-[#3F6B4F] hover:bg-[#3F6B4F] hover:text-white px-3 py-2 rounded-sm transition-all duration-300 text-xs font-medium uppercase tracking-wide flex items-center justify-center gap-1"
            >
              <FaEdit className="text-xs" />
              <span className="hidden sm:inline">Edit</span>
            </button>

            <button
              onClick={() => {
                if (
                  window.confirm(`Are you sure you want to delete "${title}"?`)
                ) {
                  onDelete(_id);
                }
              }}
              className="col-span-1 border border-[#8A4A3A] text-[#8A4A3A] hover:bg-[#8A4A3A] hover:text-white px-3 py-2 rounded-sm transition-all duration-300 text-xs font-medium uppercase tracking-wide flex items-center justify-center gap-1"
            >
              <FaTrash className="text-xs" />
              <span className="hidden sm:inline">Delete</span>
            </button>
          </div>

          {/* Mobile: Show button labels */}
          <div className="flex flex-wrap gap-1 mt-2 sm:hidden">
            <span className="text-[10px] text-[#8A7F68] bg-[#F7F3E9] px-2 py-0.5 rounded">
              Borrow
            </span>
            <span className="text-[10px] text-[#8A7F68] bg-[#F7F3E9] px-2 py-0.5 rounded">
              Review
            </span>
            <span className="text-[10px] text-[#8A7F68] bg-[#F7F3E9] px-2 py-0.5 rounded">
              Wishlist
            </span>
            <span className="text-[10px] text-[#8A7F68] bg-[#F7F3E9] px-2 py-0.5 rounded">
              Edit
            </span>
            <span className="text-[10px] text-[#8A7F68] bg-[#F7F3E9] px-2 py-0.5 rounded">
              Delete
            </span>
          </div>
        </div>
      </div>

      {/* Borrow Modal */}
      {showBorrowModal && (
        <BorrowModal
          book={book}
          onClose={() => setShowBorrowModal(false)}
          onBorrow={handleBorrow}
        />
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <ReviewModal
          book={book}
          onClose={() => setShowReviewModal(false)}
          onReviewAdded={onReviewAdded}
        />
      )}
    </>
  );
};

export default BookCard;
