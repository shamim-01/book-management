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
        color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        icon: <FaCheckCircle className="text-emerald-500" />,
        label: 'Returned',
      };
    }
    if (isOverdue(dueDate)) {
      return {
        color: 'bg-rose-100 text-rose-700 border-rose-200',
        icon: <FaExclamationCircle className="text-rose-500" />,
        label: 'Overdue',
      };
    }
    return {
      color: 'bg-teal-100 text-teal-700 border-teal-200',
      icon: <FaClock className="text-teal-500" />,
      label: 'Borrowed',
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f5f2] flex flex-col items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-emerald-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <FaBook className="text-emerald-600 text-2xl" />
          </div>
        </div>
        <p className="text-gray-500 mt-6 font-medium">
          Loading borrowed books...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f5f2]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ===== HEADER ===== */}
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-800 to-teal-800 rounded-2xl shadow-2xl mb-8">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-600 rounded-full blur-3xl"></div>
          </div>

          <div className="relative px-6 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-4xl sm:text-5xl">📖</span>
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                      Borrowed Books
                    </h1>
                    <p className="text-emerald-200 text-sm sm:text-base mt-0.5">
                      Track and manage borrowed books
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium text-white">
                    <FaBook className="text-emerald-600" />
                    {borrows.length} {borrows.length === 1 ? 'book' : 'books'}{' '}
                    borrowed
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-amber-400/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium text-amber-100">
                    <FaClock className="text-amber-300" />
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
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 
                         text-white px-5 sm:px-6 py-2.5 rounded-xl transition-all duration-300 
                         font-medium border border-white/20 hover:scale-105 text-sm sm:text-base"
              >
                <FaArrowLeft className="text-sm" />
                Back to Books
              </Link>
            </div>
          </div>
        </div>

        {/* ===== BORROWED BOOKS GRID ===== */}
        {borrows.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="text-7xl mb-4">📭</div>
            <h3 className="text-2xl font-semibold text-gray-700">
              No borrowed books
            </h3>
            <p className="text-gray-400 mt-2">
              You haven't borrowed any books yet
            </p>
            <Link
              to="/books"
              className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-emerald-700 to-emerald-700 
                       text-white px-6 py-2.5 rounded-xl hover:from-emerald-700 hover:to-emerald-800 
                       transition-all duration-300 font-medium shadow-md hover:shadow-lg"
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
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
                >
                  {/* Card Header - Book Info */}
                  <div className="p-5 pb-3 border-b border-gray-100">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-800 truncate">
                          {borrow.book?.title || 'Unknown Book'}
                        </h3>
                        <p className="text-sm text-gray-500">
                          by {borrow.book?.author || 'Unknown Author'}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusInfo.color} shrink-0 ml-2`}
                      >
                        {statusInfo.icon}
                        {statusInfo.label}
                      </span>
                    </div>
                  </div>

                  {/* Card Body - Borrower Details */}
                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-3 text-sm">
                      <FaUser className="text-gray-400 w-4" />
                      <span className="text-gray-700">
                        {borrow.borrowerName}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <FaEnvelope className="text-gray-400 w-4" />
                      <span className="text-gray-600 truncate">
                        {borrow.borrowerEmail}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <FaCalendarAlt className="text-gray-400 w-4" />
                      <span className="text-gray-700">
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
                        <div className="mt-2 p-2.5 bg-rose-50 border border-rose-200 rounded-lg">
                          <p className="text-xs text-rose-700 flex items-center gap-1.5">
                            <FaExclamationCircle className="text-rose-500" />
                            <span className="font-medium">
                              Overdue by {overdueDays}{' '}
                              {overdueDays === 1 ? 'day' : 'days'}
                            </span>
                          </p>
                        </div>
                      )}

                    {/* Notes */}
                    {borrow.notes && (
                      <div className="mt-1 p-2.5 bg-gray-50 border border-gray-100 rounded-lg">
                        <p className="text-xs text-gray-500 italic">
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
                        className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                          returning === borrow._id
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-emerald-700 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-600 shadow-md hover:shadow-lg hover:scale-[1.02]'
                        }`}
                      >
                        {returning === borrow._id ? (
                          <>
                            <FaSpinner className="animate-spin" />
                            Returning...
                          </>
                        ) : (
                          <>
                            <FaUndo />
                            Return Book
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="w-full py-2.5 text-center text-sm text-emerald-700 font-medium bg-emerald-50 rounded-xl">
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
