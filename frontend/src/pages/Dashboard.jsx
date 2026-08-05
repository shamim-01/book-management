import React, { useState, useEffect } from 'react';
import {
  getDashboardStats,
  getWishlist,
  getReadingStats,
  getChallenge,
} from '../services/api';
import {
  FaBook,
  FaBookOpen,
  FaClock,
  FaSyncAlt,
  FaSpinner,
  FaChartPie,
  FaArrowUp,
  FaHeart,
  FaStar,
  FaBullseye,
  FaTrophy,
  FaHistory,
  FaExclamationCircle,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ReadingChallenge from '../components/ReadingChallenge';

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
  const [wishlistCount, setWishlistCount] = useState(0);
  const [readingStats, setReadingStats] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('📊 Fetching all dashboard data...');

      // Fetch dashboard stats
      const statsResponse = await getDashboardStats();
      console.log('📊 Dashboard Stats:', statsResponse.data);

      if (statsResponse.data && statsResponse.data.success) {
        const data = statsResponse.data.data;
        setStats({
          totalBooks: data.totalBooks || 0,
          availableBooks: data.availableBooks || 0,
          totalBorrows: data.totalBorrows || 0,
          activeBorrows: data.activeBorrows || 0,
          recentBooks: data.recentBooks || [],
          genreStats: data.genreStats || [],
          allBooks: data.allBooks || [],
        });
      }

      // Fetch wishlist
      try {
        const wishlistResponse = await getWishlist();
        setWishlistCount(wishlistResponse.data.wishlist?.length || 0);
      } catch (error) {
        console.error('❌ Error fetching wishlist:', error);
      }

      // Fetch reading stats
      try {
        const readingResponse = await getReadingStats();
        setReadingStats(readingResponse.data.stats);
      } catch (error) {
        console.error('❌ Error fetching reading stats:', error);
      }

      // Fetch challenge
      try {
        const challengeResponse = await getChallenge();
        setChallenge(challengeResponse.data.challenge);
      } catch (error) {
        console.error('❌ Error fetching challenge:', error);
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
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-[#F7F3E9]">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-2 border-[#3F6B4F]/20"></div>
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#3F6B4F] animate-spin"></div>
          <FaChartPie className="absolute inset-0 m-auto text-[#3F6B4F] text-lg" />
        </div>
        <p className="text-[#5B5347] mt-4 tracking-wide text-sm uppercase">
          Loading your library...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F3E9] flex items-center justify-center p-4">
        <div className="bg-white rounded-sm shadow-xl p-8 max-w-md w-full border border-[#B08D57]/25">
          <div className="text-center">
            <FaExclamationCircle className="text-3xl text-[#8A6A2E] mx-auto mb-4" />
            <h3 className="font-serif text-xl font-bold text-[#1F2E24] mb-2">
              Error Loading Dashboard
            </h3>
            <p className="text-[#8A7F68] text-sm mb-6">{error}</p>
            <button
              onClick={fetchAllData}
              className="inline-flex items-center gap-2 bg-[#B08D57] text-[#132018]
                       px-6 py-2.5 rounded-sm hover:bg-[#C7A56C]
                       transition-all duration-300 font-semibold tracking-wide"
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
    <div className="min-h-screen bg-[#F7F3E9] font-sans text-[#2A2A24]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ===== HEADER ===== */}
        <div className="relative overflow-hidden bg-[#132018] rounded-sm shadow-2xl mb-8">
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
          <div className="absolute -top-24 -right-24 w-[24rem] h-[24rem] bg-[#3F6B4F]/20 rounded-full blur-3xl"></div>

          <div className="relative px-6 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="inline-flex items-center gap-2 border border-[#B08D57]/40 px-4 py-1.5 rounded-full text-xs tracking-[0.2em] uppercase text-[#D8C9A3] mb-4">
                  <FaChartPie className="text-[#B08D57]" />
                  Dashboard
                </div>
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                  Your library,{' '}
                  <span className="italic text-[#D8C9A3]">at a glance</span>
                </h1>

                <div className="flex flex-wrap items-center gap-3 mt-5">
                  <span className="inline-flex items-center gap-1.5 border border-[#B08D57]/40 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium text-white/80">
                    <FaBook className="text-[#B08D57]" />
                    {stats.totalBooks} total books
                  </span>
                  <span className="inline-flex items-center gap-1.5 border border-[#8FBF9F]/30 bg-[#8FBF9F]/10 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium text-[#8FBF9F]">
                    <span className="text-[#8FBF9F]">●</span>
                    {stats.availableBooks} available
                  </span>
                  <span className="inline-flex items-center gap-1.5 border border-[#D9A566]/30 bg-[#D9A566]/10 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium text-[#D9A566]">
                    <FaClock className="text-[#D9A566]" />
                    {stats.activeBorrows} active borrows
                  </span>
                </div>
              </div>

              <button
                onClick={fetchAllData}
                className="inline-flex items-center gap-2 bg-[#B08D57] text-[#132018]
                         px-5 sm:px-6 py-2.5 rounded-sm hover:bg-[#C7A56C]
                         transition-all duration-300 font-semibold tracking-wide text-sm sm:text-base"
              >
                <FaSyncAlt className={loading ? 'animate-spin' : ''} />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* ===== STATS CARDS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#B08D57]/25 border border-[#B08D57]/25 mb-8">
          {[
            {
              label: 'Total Books',
              value: stats.totalBooks,
              sub: 'In your library',
              icon: FaBook,
              no: '01',
            },
            {
              label: 'Available',
              value: stats.availableBooks,
              sub: 'Ready to borrow',
              icon: FaBookOpen,
              no: '02',
            },
            {
              label: 'Borrowed',
              value: borrowedBooks,
              sub: 'Currently out',
              icon: FaClock,
              no: '03',
            },
            {
              label: 'Total Borrows',
              value: stats.totalBorrows,
              sub: 'All time',
              icon: FaSyncAlt,
              no: '04',
            },
          ].map(card => (
            <div
              key={card.label}
              className="relative bg-white p-6 hover:bg-[#F7F3E9] transition-colors duration-300 group"
            >
              <span className="absolute top-3 right-3 font-mono text-[10px] text-[#8A7F68] tracking-widest">
                NO.{card.no}
              </span>
              <card.icon className="text-2xl text-[#3F6B4F] mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-3xl font-serif font-bold text-[#1F2E24]">
                {card.value}
              </p>
              <p className="text-xs text-[#8A7F68] mt-1 uppercase tracking-wide">
                {card.label}
              </p>
              <p className="text-xs text-[#B08D57] mt-2">{card.sub}</p>
            </div>
          ))}
        </div>

        {/* ===== QUICK LINKS + STATS ROW ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Quick Links */}
          <div className="bg-white border border-[#B08D57]/20 p-6 col-span-1">
            <h3 className="font-semibold text-[#1F2E24] mb-4 text-sm uppercase tracking-wide">
              Quick Links
            </h3>
            <div className="space-y-3">
              <Link
                to="/wishlist"
                className="flex items-center gap-3 p-3 bg-[#F7F3E9] hover:bg-[#B08D57]/10 rounded transition group"
              >
                <FaHeart className="text-red-400 group-hover:scale-110 transition" />
                <span className="text-sm font-medium text-[#1F2E24]">
                  Wishlist
                </span>
                <span className="ml-auto text-xs bg-[#B08D57]/20 px-2 py-0.5 rounded">
                  {wishlistCount}
                </span>
              </Link>
              <Link
                to="/history"
                className="flex items-center gap-3 p-3 bg-[#F7F3E9] hover:bg-[#B08D57]/10 rounded transition group"
              >
                <FaHistory className="text-[#3F6B4F] group-hover:scale-110 transition" />
                <span className="text-sm font-medium text-[#1F2E24]">
                  Reading History
                </span>
              </Link>
              <Link
                to="/books"
                className="flex items-center gap-3 p-3 bg-[#F7F3E9] hover:bg-[#B08D57]/10 rounded transition group"
              >
                <FaBook className="text-[#B08D57] group-hover:scale-110 transition" />
                <span className="text-sm font-medium text-[#1F2E24]">
                  Browse Books
                </span>
              </Link>
            </div>
          </div>

          {/* Reading Stats */}
          {readingStats && (
            <div className="bg-white border border-[#B08D57]/20 p-6 col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[#1F2E24] text-sm uppercase tracking-wide">
                  <FaStar className="inline mr-2 text-yellow-500" />
                  Reading Statistics
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#F7F3E9] p-3 rounded text-center">
                  <p className="text-xs text-[#6B6354]">Books Read</p>
                  <p className="text-xl font-bold text-[#1F2E24]">
                    {readingStats.totalBooks || 0}
                  </p>
                </div>
                <div className="bg-[#F7F3E9] p-3 rounded text-center">
                  <p className="text-xs text-[#6B6354]">Pages</p>
                  <p className="text-xl font-bold text-[#1F2E24]">
                    {readingStats.totalPages || 0}
                  </p>
                </div>
                <div className="bg-[#F7F3E9] p-3 rounded text-center">
                  <p className="text-xs text-[#6B6354]">Avg Rating</p>
                  <p className="text-xl font-bold text-[#1F2E24]">
                    {readingStats.avgRating || 0}⭐
                  </p>
                </div>
                <div className="bg-[#F7F3E9] p-3 rounded text-center">
                  <p className="text-xs text-[#6B6354]">Favorite Genre</p>
                  <p className="text-sm font-bold text-[#1F2E24] truncate">
                    {readingStats.favoriteGenre || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ===== READING CHALLENGE ===== */}
        <div className="mb-8">
          <ReadingChallenge />
        </div>

        {/* ===== RECENT BOOKS ===== */}
        <div className="bg-white border border-[#B08D57]/20 p-6 mb-8">
          <div className="flex items-center justify-between mb-6 border-b border-[#B08D57]/30 pb-4">
            <h2 className="font-serif text-2xl font-bold text-[#1F2E24] flex items-center gap-2">
              <FaBook className="text-[#3F6B4F] text-lg" />
              Recently Added
            </h2>
            <Link
              to="/books"
              className="text-[#3F6B4F] hover:text-[#1F2E24] font-medium flex items-center gap-1 text-sm uppercase tracking-wide"
            >
              View All →
            </Link>
          </div>

          {!stats.recentBooks || stats.recentBooks.length === 0 ? (
            <div className="text-center py-14 bg-[#F7F3E9]/60 border border-dashed border-[#B08D57]/40 rounded-sm">
              <p className="text-[#8A7F68]">No books added yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.recentBooks.slice(0, 6).map((book, index) => (
                <div
                  key={book._id}
                  className="group border border-[#B08D57]/20 p-4 hover:bg-[#F7F3E9]/60 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs text-[#B08D57] w-6">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif font-semibold text-[#1F2E24] truncate group-hover:text-[#3F6B4F] transition">
                        {book.title}
                      </h3>
                      <p className="text-sm text-[#8A7F68]">by {book.author}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span
                          className={`text-[11px] px-3 py-1 rounded-full uppercase tracking-wide font-medium ${
                            book.isAvailable
                              ? 'bg-[#3F6B4F]/10 text-[#3F6B4F]'
                              : 'bg-[#B08D57]/15 text-[#8A6A2E]'
                          }`}
                        >
                          {book.isAvailable ? 'Available' : 'Borrowed'}
                        </span>
                        {book.price > 0 && (
                          <span className="text-sm font-semibold text-[#1F2E24]">
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
          <div className="bg-white border border-[#B08D57]/20 p-6">
            <h2 className="font-serif text-2xl font-bold text-[#1F2E24] flex items-center gap-2 mb-6 border-b border-[#B08D57]/30 pb-4">
              <FaChartPie className="text-[#3F6B4F] text-lg" />
              Genre Distribution
            </h2>

            <div className="flex flex-wrap gap-3">
              {stats.genreStats.map((genre, index) => {
                const percentage = (
                  (genre.count / stats.totalBooks) *
                  100
                ).toFixed(1);

                return (
                  <div
                    key={genre._id}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium border border-[#B08D57]/30 bg-[#F7F3E9] text-[#1F2E24]"
                  >
                    <span>{genre._id || 'Other'}</span>
                    <span className="bg-[#3F6B4F]/10 text-[#3F6B4F] px-2 py-0.5 rounded-full text-xs font-bold">
                      {genre.count}
                    </span>
                    <span className="text-xs text-[#8A7F68]">
                      ({percentage}%)
                    </span>
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
            className="group w-10 h-10 rounded-full bg-[#3F6B4F]/10 text-[#3F6B4F]
                     hover:bg-[#3F6B4F] hover:text-white transition-all duration-300
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
