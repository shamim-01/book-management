import React from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

const RatingStars = ({
  rating,
  onRatingChange,
  readonly = false,
  size = 'text-xl',
}) => {
  const [hoverRating, setHoverRating] = React.useState(0);

  const handleClick = value => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseEnter = value => {
    if (!readonly) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  const displayRating = hoverRating || rating || 0;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          className="focus:outline-none transition-transform hover:scale-110"
          disabled={readonly}
        >
          {star <= displayRating ? (
            <FaStar className={`${size} text-yellow-400`} />
          ) : star - 0.5 <= displayRating ? (
            <FaStarHalfAlt className={`${size} text-yellow-400`} />
          ) : (
            <FaRegStar className={`${size} text-gray-300 dark:text-gray-600`} />
          )}
        </button>
      ))}
      {rating > 0 && (
        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
          ({rating.toFixed(1)})
        </span>
      )}
    </div>
  );
};

export default RatingStars;
