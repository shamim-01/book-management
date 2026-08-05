import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBook } from '../services/api';
import { FaBook } from 'react-icons/fa';

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
      <div className="flex flex-col items-center justify-center min-h-[50vh] bg-[#F7F3E9]">
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 rounded-full border-2 border-[#3F6B4F]/20"></div>
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#3F6B4F] animate-spin"></div>
          <FaBook className="absolute inset-0 m-auto text-[#3F6B4F] text-sm" />
        </div>
        <p className="text-[#5B5347] mt-4 tracking-wide text-sm uppercase">
          Loading book details…
        </p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-[#F7F3E9]">
        <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
          <div className="bg-white/60 border border-dashed border-[#B08D57]/40 rounded-sm p-10">
            <div className="w-14 h-14 mx-auto border border-[#8A4A3A] rounded-full flex items-center justify-center text-xl text-[#8A4A3A] mb-5">
              <FaBook />
            </div>
            <h2 className="font-serif text-xl font-bold text-[#1F2E24] mb-2">
              Book not found
            </h2>
            <p className="text-[#8A7F68]">
              This title may have been removed or the link is incorrect.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3E9] font-sans text-[#2A2A24]">
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <div className="bg-white/70 rounded-sm border border-[#B08D57]/25 overflow-hidden">
          {/* Top accent bar */}
          <div className="h-[3px] bg-[#B08D57]"></div>

          <div className="p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <span className="text-[#B08D57] text-xs uppercase tracking-[0.25em]">
                  Catalog Entry
                </span>
                <h1 className="font-serif text-3xl font-bold text-[#1F2E24] mt-1 mb-2">
                  {book.title}
                </h1>
                <p className="text-lg text-[#6B6354]">by {book.author}</p>
              </div>

              <span
                className={`shrink-0 text-xs font-medium uppercase tracking-wide px-4 py-2 rounded-full border ${
                  book.isAvailable
                    ? 'bg-[#3F6B4F]/10 text-[#3F6B4F] border-[#3F6B4F]/25'
                    : 'bg-[#B08D57]/10 text-[#8A6A2E] border-[#B08D57]/30'
                }`}
              >
                {book.isAvailable ? 'Available' : 'Borrowed'}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-[#3F6B4F]/10 text-[#3F6B4F] border border-[#3F6B4F]/25 px-3 py-1.5 rounded-full text-xs uppercase tracking-wide font-medium">
                {book.genre}
              </span>
              {book.publishedYear && (
                <span className="bg-[#B08D57]/10 text-[#8A6A2E] border border-[#B08D57]/25 px-3 py-1.5 rounded-full text-xs font-mono">
                  {book.publishedYear}
                </span>
              )}
              {book.price > 0 && (
                <span className="bg-[#B08D57]/15 text-[#8A6A2E] border border-[#B08D57]/30 px-3 py-1.5 rounded-full text-xs font-mono font-semibold">
                  ${book.price}
                </span>
              )}
            </div>

            {book.description && (
              <div className="pt-6 border-t border-[#B08D57]/20">
                <h3 className="text-xs font-semibold text-[#8A7F68] uppercase tracking-[0.2em] mb-2">
                  Description
                </h3>
                <p className="text-[#2A2A24] leading-relaxed">
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
