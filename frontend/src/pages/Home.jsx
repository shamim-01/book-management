import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaBook,
  FaBookOpen,
  FaUsers,
  FaChartLine,
  FaArrowRight,
  FaStar,
  FaClock,
  FaPlus,
  FaSearch,
  FaShieldAlt,
  FaHeadset,
  FaRocket,
  FaChevronRight,
} from 'react-icons/fa';
import { getBooks, getBorrows } from '../services/api';
import toast from 'react-hot-toast';

const Home = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    availableBooks: 0,
    borrowedBooks: 0,
    totalBorrows: 0,
    recentBooks: [],
    popularGenres: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const booksRes = await getBooks();
      const books = booksRes.data.data || [];
      const borrowsRes = await getBorrows();
      const borrows = borrowsRes.data.data || [];

      const totalBooks = books.length;
      const availableBooks = books.filter(b => b.isAvailable).length;
      const borrowedBooks = totalBooks - availableBooks;
      const recentBooks = books.slice(0, 5);

      const genreCount = {};
      books.forEach(book => {
        genreCount[book.genre] = (genreCount[book.genre] || 0) + 1;
      });
      const popularGenres = Object.entries(genreCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
        .map(([genre, count]) => ({ genre, count }));

      setStats({
        totalBooks,
        availableBooks,
        borrowedBooks,
        totalBorrows: borrows.length,
        recentBooks,
        popularGenres,
      });

      setLoading(false);
    } catch (error) {
      console.error('❌ Error:', error);
      toast.error('Failed to load dashboard');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-700"></div>
        <p className="text-gray-500 mt-4">Loading your library...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50/20">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-900 to-slate-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span className="text-emerald-300">System Online</span>
                <span className="text-white/40">•</span>
                <span className="text-white/60">v2.0.0</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
                  Smart Library
                </span>
                <br />
                <span className="text-white">Management System</span>
              </h1>

              <p className="text-lg text-white/70 max-w-lg leading-relaxed">
                Effortlessly manage your book collection, track borrows, and
                organize your library with our powerful and intuitive platform.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/books"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 
                           text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 
                           transition-all duration-300 shadow-lg hover:shadow-2xl font-medium"
                >
                  Get Started <FaRocket className="text-sm" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm 
                           text-white px-6 py-3 rounded-xl hover:bg-white/20 
                           transition-all duration-300 font-medium border border-white/10"
                >
                  Learn More <FaChevronRight className="text-sm" />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-white/60">
                  <FaShieldAlt className="text-emerald-400" />
                  <span className="text-sm">Secure</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <FaHeadset className="text-teal-400" />
                  <span className="text-sm">24/7 Support</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <FaChartLine className="text-emerald-300" />
                  <span className="text-sm">Analytics</span>
                </div>
              </div>
            </div>

            {/* Right Content - Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition">
                <div className="flex items-center gap-3 text-emerald-300 mb-2">
                  <FaBook className="text-2xl" />
                  <span className="text-sm font-medium">Total Books</span>
                </div>
                <p className="text-3xl font-bold text-white">
                  {stats.totalBooks}
                </p>
                <p className="text-xs text-white/40 mt-1">In your library</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition">
                <div className="flex items-center gap-3 text-teal-300 mb-2">
                  <FaBookOpen className="text-2xl" />
                  <span className="text-sm font-medium">Available</span>
                </div>
                <p className="text-3xl font-bold text-white">
                  {stats.availableBooks}
                </p>
                <p className="text-xs text-white/40 mt-1">Ready to borrow</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition">
                <div className="flex items-center gap-3 text-amber-300 mb-2">
                  <FaClock className="text-2xl" />
                  <span className="text-sm font-medium">Borrowed</span>
                </div>
                <p className="text-3xl font-bold text-white">
                  {stats.borrowedBooks}
                </p>
                <p className="text-xs text-white/40 mt-1">Currently out</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition">
                <div className="flex items-center gap-3 text-emerald-200 mb-2">
                  <FaUsers className="text-2xl" />
                  <span className="text-sm font-medium">Total Borrows</span>
                </div>
                <p className="text-3xl font-bold text-white">
                  {stats.totalBorrows}
                </p>
                <p className="text-xs text-white/40 mt-1">All time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Curve */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full" fill="white">
            <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-emerald-700 text-sm font-semibold uppercase tracking-wider">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
              Everything You Need to{' '}
              <span className="text-emerald-700">Manage Your Library</span>
            </h2>
            <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
              Powerful tools to organize, track, and manage your book collection
              efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-emerald-200 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center text-2xl text-white mb-4 group-hover:scale-110 transition">
                <FaBook />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Book Management
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Add, edit, and organize your entire book collection with ease.
                Keep track of every book's details and availability.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-teal-200 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-600 to-emerald-500 rounded-2xl flex items-center justify-center text-2xl text-white mb-4 group-hover:scale-110 transition">
                <FaBookOpen />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Borrow & Return
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Simple borrow and return system with due date tracking. Never
                lose track of borrowed books again.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-emerald-200 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-700 to-emerald-500 rounded-2xl flex items-center justify-center text-2xl text-white mb-4 group-hover:scale-110 transition">
                <FaChartLine />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Analytics Dashboard
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Get insights into your library with beautiful charts and
                statistics. Track trends and make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== QUICK STATS SECTION ===== */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition text-center">
              <div className="text-4xl mb-2">📚</div>
              <p className="text-3xl font-bold text-gray-800">
                {stats.totalBooks}
              </p>
              <p className="text-gray-500 text-sm">Total Books</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition text-center">
              <div className="text-4xl mb-2">✅</div>
              <p className="text-3xl font-bold text-emerald-700">
                {stats.availableBooks}
              </p>
              <p className="text-gray-500 text-sm">Available</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition text-center">
              <div className="text-4xl mb-2">📖</div>
              <p className="text-3xl font-bold text-amber-600">
                {stats.borrowedBooks}
              </p>
              <p className="text-gray-500 text-sm">Borrowed</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition text-center">
              <div className="text-4xl mb-2">🔄</div>
              <p className="text-3xl font-bold text-teal-700">
                {stats.totalBorrows}
              </p>
              <p className="text-gray-500 text-sm">Total Borrows</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== RECENT BOOKS & GENRES ===== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Books */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <FaClock className="text-emerald-600" />
                  Recently Added
                </h3>
                <Link
                  to="/books"
                  className="text-emerald-700 hover:text-emerald-900 font-medium flex items-center gap-1"
                >
                  View All <FaChevronRight className="text-sm" />
                </Link>
              </div>

              {stats.recentBooks.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-2xl">
                  <p className="text-gray-500">No books added yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {stats.recentBooks.map((book, index) => (
                    <div
                      key={book._id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition group"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-400 w-6">
                          #{index + 1}
                        </span>
                        <div>
                          <p className="font-medium text-gray-800 group-hover:text-emerald-700 transition">
                            {book.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            by {book.author}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-xs px-3 py-1.5 rounded-full ${
                          book.isAvailable
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {book.isAvailable ? '✅ Available' : '📖 Borrowed'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Popular Genres */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
                <FaStar className="text-amber-500" />
                Popular Genres
              </h3>

              {stats.popularGenres.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-2xl">
                  <p className="text-gray-500">No genres yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {stats.popularGenres.map(item => (
                    <div
                      key={item.genre}
                      className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-700">
                          {item.genre}
                        </span>
                        <span className="text-sm font-semibold text-emerald-700">
                          {item.count} books
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full transition-all duration-1000"
                          style={{
                            width: `${(item.count / stats.totalBooks) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-16 bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to{' '}
              <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                Organize
              </span>{' '}
              Your Library?
            </h2>
            <p className="text-white/60 text-lg mb-8">
              Start managing your book collection today. Add your first book and
              experience the difference.
            </p>

            {/* ✅ Fixed: Add Your First Book - Books Page এ যাবে */}
            <Link
              to="/books"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 
                       text-white px-8 py-3.5 rounded-xl hover:from-emerald-600 hover:to-teal-700 
                       transition-all duration-300 shadow-lg hover:shadow-2xl text-lg font-medium"
            >
              <FaPlus />
              Browse Books
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-slate-900 text-white/60 py-8 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <FaBook className="text-emerald-400" />
              <span className="text-white font-medium">BookManager</span>
              <span className="text-xs">v2.0.0</span>
            </div>
            <p className="text-sm text-center">
              © 2026 BookManager. All rights reserved. Made with ❤️
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link to="/about" className="hover:text-white transition">
                About
              </Link>
              <Link to="/books" className="hover:text-white transition">
                Books
              </Link>
              <Link to="/dashboard" className="hover:text-white transition">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
