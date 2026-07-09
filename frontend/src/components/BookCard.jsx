import React, { useState } from 'react';
import BorrowModal from './BorrowModal';
import ReviewModal from './ReviewModal';
import {
  FaEdit,
  FaTrash,
  FaBookOpen,
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
} from 'react-icons/fa';

// ✅ Import local images
import book1 from '../images/book1.jpg';
import book2 from '../images/book2.jpg';
import book3 from '../images/book3.jpg';
import book4 from '../images/book4.jpg';

// ✅ Fallback image if import fails
const fallbackImage =
  'https://dummyimage.com/400x300/4f46e5/ffffff&text=📚+No+Cover';

// ✅ Map book titles to specific images (optional)
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

const BookCard = ({ book, onDelete, onEdit, onBorrow, onReviewAdded }) => {
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

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

  // ✅ Updated renderStars with half star support
  const renderStars = (rating = 0) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400 text-xs" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <FaStarHalfAlt key={i} className="text-yellow-400 text-xs" />,
        );
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300 text-xs" />);
      }
    }
    return stars;
  };

  // ✅ Get the image source
  const getImageSrc = () => {
    if (coverImage && coverImage.trim() !== '') {
      return coverImage;
    }
    return getImageForBook(title);
  };

  return (
    <>
      <div className="group bg-white dark:bg-dark-800 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-gray-100 dark:border-dark-700">
        {/* Cover Image */}
        <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dark-700 dark:to-dark-800 overflow-hidden">
          <img
            src={getImageSrc()}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={e => {
              e.target.src = fallbackImage;
            }}
          />

          {/* Status Badge on Image */}
          <div className="absolute top-3 right-3">
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full shadow-lg backdrop-blur-sm ${
                isAvailable
                  ? 'bg-emerald-500/90 text-white'
                  : 'bg-rose-500/90 text-white'
              }`}
            >
              {isAvailable ? '✅ Available' : '📖 Borrowed'}
            </span>
          </div>

          {/* Rating Badge on Image */}
          {averageRating > 0 && (
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400 text-xs" />
                <span className="text-white text-xs font-medium">
                  {averageRating.toFixed(1)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-5">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-2 flex-1">
              {title || 'Untitled'}
            </h3>
          </div>

          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 flex items-center space-x-1">
            <span className="font-medium text-gray-600 dark:text-gray-400">
              by
            </span>
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {author || 'Unknown Author'}
            </span>
          </p>

          <div className="flex items-center mt-2 space-x-1">
            {renderStars(averageRating)}
            <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">
              ({averageRating ? averageRating.toFixed(1) : '0'})
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2.5 py-1 rounded-full border border-indigo-100 dark:border-indigo-800/50">
              📚 {genre || 'Other'}
            </span>
            {publishedYear && (
              <span className="text-xs bg-gray-50 dark:bg-dark-700 text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-full border border-gray-200 dark:border-dark-600">
                📅 {publishedYear}
              </span>
            )}
            {price > 0 && (
              <span className="text-xs bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-800/50 font-semibold">
                💰 ${price}
              </span>
            )}
          </div>

          {/* Action Buttons - 4 Columns */}
          <div className="mt-4 grid grid-cols-4 gap-2">
            {isAvailable ? (
              <button
                onClick={() => setShowBorrowModal(true)}
                className="col-span-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-3 py-2 rounded-xl hover:from-emerald-600 hover:to-green-600 transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg flex items-center justify-center space-x-1"
              >
                <FaBookOpen className="text-xs" />
                <span className="text-xs">Borrow</span>
              </button>
            ) : (
              <button
                disabled
                className="col-span-1 bg-gray-200 dark:bg-dark-700 text-gray-500 dark:text-gray-500 px-3 py-2 rounded-xl cursor-not-allowed text-sm font-medium flex items-center justify-center space-x-1"
              >
                <span className="text-xs">Borrowed</span>
              </button>
            )}

            {/* ✅ Review Button */}
            <button
              onClick={() => setShowReviewModal(true)}
              className="col-span-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-xl transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg flex items-center justify-center space-x-1"
            >
              <FaStar className="text-xs" />
              <span className="text-xs">Review</span>
            </button>

            <button
              onClick={() => onEdit(book)}
              className="col-span-1 bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded-xl transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg flex items-center justify-center space-x-1"
            >
              <FaEdit className="text-xs" />
              <span className="text-xs">Edit</span>
            </button>

            <button
              onClick={() => {
                if (
                  window.confirm(`Are you sure you want to delete "${title}"?`)
                ) {
                  onDelete(_id);
                }
              }}
              className="col-span-1 bg-rose-500 hover:bg-rose-600 text-white px-3 py-2 rounded-xl transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg flex items-center justify-center space-x-1"
            >
              <FaTrash className="text-xs" />
              <span className="text-xs">Delete</span>
            </button>
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

      {/* ✅ Review Modal */}
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
