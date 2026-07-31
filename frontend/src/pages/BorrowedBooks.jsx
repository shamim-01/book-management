import React, { useState, useEffect } from 'react';
import { getBorrows, returnBook } from '../services/api';
import toast from 'react-hot-toast';
import {
  FaBook,
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaClock,
  FaSpinner,
  FaArrowLeft,
  FaUndo,
  FaExclamationCircle,
  FaCheckCircle,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BorrowedBooks = () => {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returning, setReturning] = useState(null);

  useEffect(() => {
    fetchBorrows();
  }, []);

  const fetchBorrows = async () => {
    try {
      setLoading(true);
      const response = await getBorrows();
      setBorrows(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load borrowed books');
      setLoading(false);
    }
  };

  const handleReturn = async borrowId => {
    setReturning(borrowId);
    try {
      await returnBook(borrowId);
      toast.success('✅ Book returned successfully!');
      fetchBorrows();
    } catch (error) {
      toast.error('❌ Failed to return book');
    } finally {
      setReturning(null);
    }
  };

  // Calculate overdue days
  const getOverdueDays = dueDate => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = today - due;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Check if overdue
  const isOverdue = dueDate => {
    return new Date() > new Date(dueDate);
  };

  // Get status color and icon
  const getStatusInfo = (status, dueDate) => {
    if (status === 'returned') {
      return {
        color: 'bg-[#3F6B4F]/10 text-[#3F6B4F] border-[#3F6B4F]/25',
        icon: <FaCheckCircle className="text-[#3F6B4F]" />,
        label: 'Returned',
      };
    }
    if (isOverdue(dueDate)) {
      return {
        color: 'bg-[#8A4A3A]/10 text-[#8A4A3A] border-[#8A4A3A]/25',
        icon: <FaExclamationCircle className="text-[#8A4A3A]" />,
        label: 'Overdue',
      };
    }
    return {
      color: 'bg-[#B08D57]/10 text-[#8A6A2E] border-[#B08D57]/25',
      icon: <FaClock className="text-[#B08D57]" />,
      label: 'Borrowed',
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F3E9] flex flex-col items-center justify-center">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-2 border-[#3F6B4F]/20"></div>
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#3F6B4F] animate-spin"></div>
          <FaBook className="absolute inset-0 m-auto text-[#3F6B4F] text-lg" />
        </div>
        <p className="text-[#5B5347] mt-4 tracking-wide text-sm uppercase">
          Loading borrowed books…
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3E9] font-sans text-[#2A2A24]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* ===== HEADER ===== */}
        <div className="relative overflow-hidden bg-[#132018] rounded-sm shadow-xl mb-10">
          {/* Book-spine texture bars */}
          <div className="absolute inset-0 flex opacity-[0.08]">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 border-r border-[#B08D57]"
                style={{
                  backgroundColor: i % 3 === 0 ? '#B08D57' : 'transparent',
                }}
              />
            ))}
          </div>
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#3F6B4F]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-16 w-64 h-64 bg-[#B08D57]/10 rounded-full blur-3xl"></div>

          <div className="relative px-6 sm:px-8 lg:px-10 py-9 sm:py-11 lg:py-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
              <div>
                <span className="text-[#B08D57] text-xs uppercase tracking-[0.25em]">
                  On Loan
                </span>
                <div className="flex items-center gap-3 mt-2">
                  <div className="w-11 h-11 border border-[#B08D57]/50 rounded-full flex items-center justify-center text-[#B08D57] flex-shrink-0">
                    <FaBook />
                  </div>
                  <div>
                    <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                      Borrowed Books
                    </h1>
                    <p className="text-white/50 text-sm sm:text-base mt-0.5">
                      Track and manage borrowed books
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <span className="inline-flex items-center gap-1.5 border border-white/15 px-3 sm:px-4 py-1.5 rounded-full text-xs uppercase tracking-wide text-white/70">
                    <FaBook className="text-[#B08D57]" />
                    {borrows.length} {borrows.length === 1 ? 'book' : 'books'}{' '}
                    borrowed
                  </span>
                  <span className="inline-flex items-center gap-1.5 border border-[#8A4A3A]/50 bg-[#8A4A3A]/15 px-3 sm:px-4 py-1.5 rounded-full text-xs uppercase tracking-wide text-[#E0A38E]">
                    <FaClock className="text-[#D9A566]" />
                    {
                      borrows.filter(
                        b => b.status === 'borrowed' && isOverdue(b.dueDate),
                      ).length
                    }{' '}
                    overdue
                  </span>
                </div>
              </div>

              <Link
                to="/books"
                className="inline-flex items-center gap-2 bg-[#B08D57] hover:bg-[#C7A56C]
                         text-[#132018] px-5 sm:px-6 py-2.5 rounded-sm transition-all duration-300
                         font-semibold tracking-wide text-sm sm:text-base"
              >
                <FaArrowLeft className="text-sm" />
                Back to Books
              </Link>
            </div>
          </div>
        </div>

        {/* ===== BORROWED BOOKS GRID ===== */}
        {borrows.length === 0 ? (
          <div className="text-center py-20 bg-white/60 border border-dashed border-[#B08D57]/40 rounded-sm">
            <div className="w-16 h-16 mx-auto border border-[#B08D57] rounded-full flex items-center justify-center text-2xl text-[#B08D57] mb-6">
              <FaBook />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2E24]">
              No borrowed books
            </h3>
            <p className="text-[#8A7F68] mt-3">
              You haven't borrowed any books yet
            </p>
            <Link
              to="/books"
              className="mt-8 inline-flex items-center gap-2 bg-[#B08D57]
                       text-[#132018] px-6 py-2.5 rounded-sm hover:bg-[#C7A56C]
                       transition-all duration-300 font-semibold tracking-wide"
            >
              <FaBook />
              Browse Books
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {borrows.map(borrow => {
              const statusInfo = getStatusInfo(borrow.status, borrow.dueDate);
              const overdueDays = isOverdue(borrow.dueDate)
                ? getOverdueDays(borrow.dueDate)
                : 0;

              return (
                <div
                  key={borrow._id}
                  className="bg-white/70 rounded-sm border border-[#B08D57]/25 hover:border-[#B08D57]/50 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden hover:-translate-y-1"
                >
                  {/* Card Header - Book Info */}
                  <div className="p-5 pb-3 border-b border-[#B08D57]/20">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-lg font-bold text-[#1F2E24] truncate">
                          {borrow.book?.title || 'Unknown Book'}
                        </h3>
                        <p className="text-sm text-[#8A7F68]">
                          by {borrow.book?.author || 'Unknown Author'}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] uppercase tracking-wide font-medium border ${statusInfo.color} shrink-0 ml-2`}
                      >
                        {statusInfo.icon}
                        {statusInfo.label}
                      </span>
                    </div>
                  </div>

                  {/* Card Body - Borrower Details */}
                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-3 text-sm">
                      <FaUser className="text-[#B08D57] w-4" />
                      <span className="text-[#2A2A24]">
                        {borrow.borrowerName}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <FaEnvelope className="text-[#B08D57] w-4" />
                      <span className="text-[#6B6354] truncate">
                        {borrow.borrowerEmail}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <FaCalendarAlt className="text-[#B08D57] w-4" />
                      <span className="text-[#2A2A24] font-mono">
                        Due:{' '}
                        {new Date(borrow.dueDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>

                    {/* Overdue Warning */}
                    {borrow.status === 'borrowed' &&
                      isOverdue(borrow.dueDate) && (
                        <div className="mt-2 p-2.5 bg-[#8A4A3A]/10 border border-[#8A4A3A]/25 rounded-sm">
                          <p className="text-xs text-[#8A4A3A] flex items-center gap-1.5">
                            <FaExclamationCircle />
                            <span className="font-medium">
                              Overdue by {overdueDays}{' '}
                              {overdueDays === 1 ? 'day' : 'days'}
                            </span>
                          </p>
                        </div>
                      )}

                    {/* Notes */}
                    {borrow.notes && (
                      <div className="mt-1 p-2.5 bg-[#B08D57]/10 border border-[#B08D57]/20 rounded-sm">
                        <p className="text-xs text-[#6B6354] italic">
                          "{borrow.notes}"
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Card Footer - Action Button */}
                  <div className="px-5 pb-5">
                    {borrow.status === 'borrowed' ? (
                      <button
                        onClick={() => handleReturn(borrow._id)}
                        disabled={returning === borrow._id}
                        className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-sm font-medium text-xs uppercase tracking-wide transition-all duration-300 ${
                          returning === borrow._id
                            ? 'bg-[#B08D57]/10 text-[#8A7F68] cursor-not-allowed'
                            : 'bg-[#3F6B4F] text-white hover:bg-[#345A42]'
                        }`}
                      >
                        {returning === borrow._id ? (
                          <>
                            <FaSpinner className="animate-spin" />
                            Returning…
                          </>
                        ) : (
                          <>
                            <FaUndo />
                            Return Book
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="w-full py-2.5 text-center text-xs uppercase tracking-wide text-[#3F6B4F] font-medium bg-[#3F6B4F]/10 rounded-sm border border-[#3F6B4F]/20">
                        <FaCheckCircle className="inline mr-2" />
                        Returned on{' '}
                        {new Date(borrow.returnDate).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          },
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowedBooks;
