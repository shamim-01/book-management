import React, { useState, useEffect } from 'react';
import { getDashboardStats } from '../services/api';
import {
  FaBook,
  FaBookOpen,
  FaClock,
  FaSyncAlt,
  FaSpinner,
  FaChartPie,
  FaArrowUp,
  FaCheckCircle,
  FaExclamationCircle,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    availableBooks: 0,
    totalBorrows: 0,
    activeBorrows: 0,
    recentBooks: [],
    genreStats: [],
    allBooks: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('📊 Fetching dashboard stats...');

      const response = await getDashboardStats();
      console.log('📊 Full Response:', response);

      if (response.data && response.data.success) {
        const data = response.data.data;
        console.log('📊 Total Books:', data.totalBooks);
        console.log('📊 Available Books:', data.availableBooks);
        console.log('📊 Recent Books:', data.recentBooks);

        setStats({
          totalBooks: data.totalBooks || 0,
          availableBooks: data.availableBooks || 0,
          totalBorrows: data.totalBorrows || 0,
          activeBorrows: data.activeBorrows || 0,
          recentBooks: data.recentBooks || [],
          genreStats: data.genreStats || [],
          allBooks: data.allBooks || [],
        });
      } else {
        setError('Invalid response from server');
      }

      setLoading(false);
    } catch (error) {
      console.error('❌ Error fetching stats:', error);
      setError(error.message || 'Failed to load dashboard');
      setLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const borrowedBooks = stats.totalBooks - stats.availableBooks;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f0eb] flex flex-col items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-emerald-700"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <FaChartPie className="text-emerald-700 text-2xl" />
          </div>
        </div>
        <p className="text-gray-500 mt-6 font-medium">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f5f0eb] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border border-red-100">
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Error Loading Dashboard
            </h3>
            <p className="text-gray-500 text-sm mb-6">{error}</p>
            <button
              onClick={fetchStats}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 
                       text-white px-6 py-2.5 rounded-xl hover:from-red-600 hover:to-red-700 
                       transition-all duration-300 font-medium shadow-md hover:shadow-lg"
            >
              <FaSyncAlt className={loading ? 'animate-spin' : ''} />
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f0eb]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ===== HEADER ===== */}
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-900 to-slate-900 rounded-2xl shadow-2xl mb-8">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400 rounded-full blur-3xl"></div>
          </div>

          <div className="relative px-6 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-4xl sm:text-5xl">📊</span>
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                      Dashboard
                    </h1>
                    <p className="text-emerald-200 text-sm sm:text-base mt-0.5">
                      Your library at a glance
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium text-white">
                    <FaBook className="text-emerald-300" />
                    {stats.totalBooks} total books
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-emerald-400/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium text-emerald-100">
                    <span className="text-emerald-300">●</span>
                    {stats.availableBooks} available
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-amber-400/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium text-amber-100">
                    <FaClock className="text-amber-300" />
                    {stats.activeBorrows} active borrows
                  </span>
                </div>
              </div>

              <button
                onClick={fetchStats}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 
                         text-white px-5 sm:px-6 py-2.5 rounded-xl transition-all duration-300 
                         font-medium border border-white/20 hover:scale-105 text-sm sm:text-base"
              >
                <FaSyncAlt className={loading ? 'animate-spin' : ''} />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* ===== STATS CARDS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-5 border border-gray-100/80 hover:border-emerald-200 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Books</p>
                <p className="text-3xl font-bold text-gray-800 group-hover:text-emerald-700 transition">
                  {stats.totalBooks}
                </p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-3.5 rounded-xl group-hover:scale-110 transition">
                <FaBook className="text-emerald-700 text-xl" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs text-gray-400">
              <span>📚 In your library</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-5 border border-gray-100/80 hover:border-teal-200 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Available</p>
                <p className="text-3xl font-bold text-emerald-700 group-hover:scale-105 transition">
                  {stats.availableBooks}
                </p>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-3.5 rounded-xl group-hover:scale-110 transition">
                <FaBookOpen className="text-teal-700 text-xl" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs text-emerald-600">
              <FaCheckCircle className="text-emerald-500" />
              <span>Ready to borrow</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-5 border border-gray-100/80 hover:border-amber-200 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Borrowed</p>
                <p className="text-3xl font-bold text-amber-600 group-hover:scale-105 transition">
                  {borrowedBooks}
                </p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-3.5 rounded-xl group-hover:scale-110 transition">
                <FaClock className="text-amber-600 text-xl" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs text-amber-600">
              <FaExclamationCircle className="text-amber-500" />
              <span>Currently out</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-5 border border-gray-100/80 hover:border-slate-200 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Total Borrows
                </p>
                <p className="text-3xl font-bold text-slate-700 group-hover:scale-105 transition">
                  {stats.totalBorrows}
                </p>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-3.5 rounded-xl group-hover:scale-110 transition">
                <FaSyncAlt className="text-slate-600 text-xl" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
              <span>🔄 All time</span>
            </div>
          </div>
        </div>

        {/* ===== RECENT BOOKS ===== */}
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 mb-8 border border-gray-100/80">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FaBook className="text-emerald-600" />
              Recently Added
            </h2>
            <Link
              to="/books"
              className="text-sm text-emerald-700 hover:text-emerald-900 font-medium transition flex items-center gap-1"
            >
              View All →
            </Link>
          </div>

          {!stats.recentBooks || stats.recentBooks.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No books added yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.recentBooks.slice(0, 6).map((book, index) => (
                <div
                  key={book._id}
                  className="group border border-gray-100 p-4 rounded-xl hover:shadow-md transition-all duration-300 hover:border-emerald-200 hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-sm font-medium text-gray-400 w-5">
                      #{index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 truncate group-hover:text-emerald-700 transition">
                        {book.title}
                      </h3>
                      <p className="text-sm text-gray-500">by {book.author}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full ${
                            book.isAvailable
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {book.isAvailable ? '✅ Available' : '📖 Borrowed'}
                        </span>
                        {book.price > 0 && (
                          <span className="text-sm font-semibold text-gray-700">
                            ${book.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ===== GENRE DISTRIBUTION ===== */}
        {stats.genreStats && stats.genreStats.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100/80">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
              <FaChartPie className="text-emerald-600" />
              Genre Distribution
            </h2>

            <div className="flex flex-wrap gap-3">
              {stats.genreStats.map((genre, index) => {
                const colors = [
                  'bg-emerald-100 text-emerald-700 border-emerald-200',
                  'bg-teal-100 text-teal-700 border-teal-200',
                  'bg-amber-100 text-amber-700 border-amber-200',
                  'bg-green-100 text-green-700 border-green-200',
                  'bg-slate-100 text-slate-700 border-slate-200',
                  'bg-cyan-100 text-cyan-700 border-cyan-200',
                ];
                const colorClass = colors[index % colors.length];
                const percentage = (
                  (genre.count / stats.totalBooks) *
                  100
                ).toFixed(1);

                return (
                  <div
                    key={genre._id}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium border ${colorClass}`}
                  >
                    <span>{genre._id || 'Other'}</span>
                    <span className="bg-white/50 px-2 py-0.5 rounded-full text-xs font-bold">
                      {genre.count}
                    </span>
                    <span className="text-xs opacity-70">({percentage}%)</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===== FOOTER ===== */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={scrollToTop}
            className="group w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 
                     hover:bg-emerald-700 hover:text-white transition-all duration-300 
                     flex items-center justify-center shadow-sm hover:shadow-md 
                     hover:scale-110"
            aria-label="Back to top"
          >
            <FaArrowUp className="text-sm group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
