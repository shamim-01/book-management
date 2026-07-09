// frontend/src/pages/BookDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBook } from '../services/api';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      const response = await getBook(id);
      setBook(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-700"></div>
        <p className="text-gray-500 mt-4">Loading book details...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-10">
          <p className="text-4xl mb-3">📕</p>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Book not found
          </h2>
          <p className="text-gray-500">
            This title may have been removed or the link is incorrect.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50/20">
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100/80">
          {/* Top accent bar */}
          <div className="h-2 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600"></div>

          <div className="p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {book.title}
                </h1>
                <p className="text-lg text-gray-500">by {book.author}</p>
              </div>

              <span
                className={`shrink-0 text-sm font-semibold px-4 py-2 rounded-full ${
                  book.isAvailable
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                {book.isAvailable ? 'Available' : 'Borrowed'}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1.5 rounded-full text-sm font-medium">
                {book.genre}
              </span>
              {book.publishedYear && (
                <span className="bg-gray-50 text-gray-600 border border-gray-100 px-3 py-1.5 rounded-full text-sm font-medium">
                  {book.publishedYear}
                </span>
              )}
              {book.price > 0 && (
                <span className="bg-teal-50 text-teal-700 border border-teal-100 px-3 py-1.5 rounded-full text-sm font-bold">
                  ${book.price}
                </span>
              )}
            </div>

            {book.description && (
              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {book.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
