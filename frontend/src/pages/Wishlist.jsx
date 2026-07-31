// pages/Wishlist.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHeart,
  FaBook,
  FaTrash,
  FaSpinner,
  FaArrowLeft,
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import { getWishlist, removeFromWishlist } from '../services/api';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(null);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await getWishlist();
      setWishlist(response.data.wishlist || []);
    } catch (error) {
      console.error('❌ Error fetching wishlist:', error);
      toast.error('Failed to load wishlist');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async bookId => {
    setRemoving(bookId);
    try {
      await removeFromWishlist(bookId);
      setWishlist(wishlist.filter(item => item.book._id !== bookId));
      toast.success('Removed from wishlist 💔');
    } catch (error) {
      console.error('❌ Error removing:', error);
      toast.error(error.response?.data?.message || 'Failed to remove');
    } finally {
      setRemoving(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F3E9] flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-[#3F6B4F] mx-auto" />
          <p className="mt-4 text-[#6B6354]">Loading wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3E9] p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              to="/books"
              className="text-[#8A7F68] hover:text-[#3F6B4F] transition flex items-center gap-2 text-sm"
            >
              <FaArrowLeft /> Back to Books
            </Link>
            <h2 className="text-3xl font-serif font-bold text-[#1F2E24] mt-2 flex items-center gap-3">
              <FaHeart className="text-[#B08D57]" />
              My Wishlist
              <span className="text-sm font-normal text-[#6B6354]">
                ({wishlist.length} books)
              </span>
            </h2>
          </div>
        </div>

        {/* Wishlist Grid */}
        {wishlist.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <FaBook className="text-6xl text-[#B08D57]/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#1F2E24]">
              Your wishlist is empty
            </h3>
            <p className="text-[#6B6354] mt-2">
              Start adding books you want to read!
            </p>
            <Link
              to="/books"
              className="inline-block mt-4 bg-[#B08D57] text-[#132018] px-6 py-2 rounded hover:bg-[#C7A56C] transition"
            >
              Browse Books
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map(item => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                {/* Book Cover */}
                <div className="relative h-56 bg-[#132018] flex items-center justify-center">
                  {item.book.coverImage ? (
                    <img
                      src={item.book.coverImage}
                      alt={item.book.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaBook className="text-5xl text-[#B08D57]/30" />
                  )}
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(item.book._id)}
                    disabled={removing === item.book._id}
                    className="absolute top-3 right-3 bg-white/90 hover:bg-red-500 text-[#6B6354] hover:text-white p-2 rounded-full shadow-md transition disabled:opacity-50"
                  >
                    {removing === item.book._id ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      <FaTrash className="text-sm" />
                    )}
                  </button>
                </div>

                {/* Book Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-[#1F2E24] truncate">
                    {item.book.title}
                  </h3>
                  <p className="text-sm text-[#6B6354]">{item.book.author}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-[#F7F3E9] text-[#6B6354] px-2 py-1 rounded">
                      {item.book.genre || 'General'}
                    </span>
                    {item.book.rating && (
                      <span className="text-xs bg-[#3F6B4F]/10 text-[#3F6B4F] px-2 py-1 rounded flex items-center gap-1">
                        ⭐ {item.book.rating}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Link
                      to={`/books/${item.book._id}`}
                      className="flex-1 bg-[#3F6B4F] text-white text-center px-3 py-1.5 rounded hover:bg-[#345A42] transition text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                  <p className="text-xs text-[#8A7F68] mt-2">
                    Added: {new Date(item.addedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
