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

//  Import local images
import book1 from '../images/book1.jpg';
import book2 from '../images/book2.jpg';
import book3 from '../images/book3.jpg';
import book4 from '../images/book4.jpg';

//  Fallback image if import fails
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

  //  Updated renderStars with half star support
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

  //  Get the image source
  const getImageSrc = () => {
    if (coverImage && coverImage.trim() !== '') {
      return coverImage;
    }
    return getImageForBook(title);
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
          {/* subtle vignette to match ink theme */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#132018]/60 via-transparent to-transparent"></div>

          {/* Status Badge on Image */}
          <div className="absolute top-3 right-3">
            <span
              className={`px-3 py-1 text-[11px] font-medium uppercase tracking-wide rounded-full backdrop-blur-sm border ${
                isAvailable
                  ? 'bg-[#3F6B4F]/80 text-white border-white/20'
                  : 'bg-[#8A4A3A]/80 text-white border-white/20'
              }`}
            >
              {isAvailable ? 'Available' : 'Borrowed'}
            </span>
          </div>

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

          {/* Action Buttons - 4 Columns */}
          <div className="mt-4 grid grid-cols-4 gap-2">
            {isAvailable ? (
              <button
                onClick={() => setShowBorrowModal(true)}
                className="col-span-1 bg-[#3F6B4F] text-white px-3 py-2 rounded-sm hover:bg-[#345A42] transition-all duration-300 text-xs font-medium uppercase tracking-wide flex items-center justify-center gap-1"
              >
                <FaBookOpen className="text-xs" />
                <span>Borrow</span>
              </button>
            ) : (
              <button
                disabled
                className="col-span-1 bg-[#B08D57]/10 text-[#8A7F68] px-3 py-2 rounded-sm cursor-not-allowed text-xs font-medium uppercase tracking-wide flex items-center justify-center border border-[#B08D57]/15"
              >
                <span>Borrowed</span>
              </button>
            )}

            {/*  Review Button */}
            <button
              onClick={() => setShowReviewModal(true)}
              className="col-span-1 bg-[#B08D57] hover:bg-[#C7A56C] text-[#132018] px-3 py-2 rounded-sm transition-all duration-300 text-xs font-medium uppercase tracking-wide flex items-center justify-center gap-1"
            >
              <FaStar className="text-xs" />
              <span>Review</span>
            </button>

            <button
              onClick={() => onEdit(book)}
              className="col-span-1 border border-[#3F6B4F] text-[#3F6B4F] hover:bg-[#3F6B4F] hover:text-white px-3 py-2 rounded-sm transition-all duration-300 text-xs font-medium uppercase tracking-wide flex items-center justify-center gap-1"
            >
              <FaEdit className="text-xs" />
              <span>Edit</span>
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
              <span>Delete</span>
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
