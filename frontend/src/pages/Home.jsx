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
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-[#F7F3E9]">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-2 border-[#3F6B4F]/20"></div>
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#3F6B4F] animate-spin"></div>
          <FaBook className="absolute inset-0 m-auto text-[#3F6B4F] text-lg" />
        </div>
        <p className="text-[#5B5347] mt-4 tracking-wide text-sm uppercase">
          Opening the stacks…
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3E9] font-sans text-[#2A2A24]">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-[#132018]">
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
        <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] bg-[#3F6B4F]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-24 w-[24rem] h-[24rem] bg-[#B08D57]/10 rounded-full blur-3xl"></div>

        <div className="relative container mx-auto px-4 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Left Content */}
            <div className="text-white space-y-7">
              <div className="inline-flex items-center gap-2 border border-[#B08D57]/40 px-4 py-1.5 rounded-full text-xs tracking-[0.2em] uppercase text-[#D8C9A3]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B08D57] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#B08D57]"></span>
                </span>
                Reading Room Open · v2.0.0
              </div>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
                <span className="text-white">The library,</span>
                <br />
                <span className="italic text-[#D8C9A3]">catalogued</span>
                <span className="text-white"> and current.</span>
              </h1>

              <p className="text-base md:text-lg text-white/60 max-w-md leading-relaxed border-l-2 border-[#B08D57]/50 pl-4">
                Track every title, every loan, every return — one shelf at a
                time. Built for collections that keep growing.
              </p>

              <div className="flex flex-wrap items-center gap-5 pt-2">
                <Link
                  to="/books"
                  className="group inline-flex items-center gap-2 bg-[#B08D57] text-[#132018]
                           px-6 py-3 rounded-sm hover:bg-[#C7A56C]
                           transition-all duration-300 font-semibold tracking-wide"
                >
                  Enter the Catalog
                  <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-white/70 hover:text-white
                           transition-all duration-300 font-medium border-b border-white/20 hover:border-[#B08D57] pb-0.5"
                >
                  Learn More <FaChevronRight className="text-xs" />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-6 text-white/50">
                <div className="flex items-center gap-2">
                  <FaShieldAlt className="text-[#B08D57]" />
                  <span className="text-xs uppercase tracking-wider">
                    Secure
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaHeadset className="text-[#B08D57]" />
                  <span className="text-xs uppercase tracking-wider">
                    24/7 Support
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaChartLine className="text-[#B08D57]" />
                  <span className="text-xs uppercase tracking-wider">
                    Analytics
                  </span>
                </div>
              </div>
            </div>

            {/* Right Content - Catalog-card Stats */}
            <div className="grid grid-cols-2 gap-4">
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
                  value: stats.borrowedBooks,
                  sub: 'Currently out',
                  icon: FaClock,
                  no: '03',
                },
                {
                  label: 'Total Borrows',
                  value: stats.totalBorrows,
                  sub: 'All time',
                  icon: FaUsers,
                  no: '04',
                },
              ].map(card => (
                <div
                  key={card.label}
                  className="relative bg-[#F7F3E9]/95 rounded-sm p-6 shadow-xl hover:-translate-y-1 transition-transform duration-300"
                >
                  <span className="absolute top-3 right-3 font-mono text-[10px] text-[#8A7F68] tracking-widest">
                    NO.{card.no}
                  </span>
                  <card.icon className="text-2xl text-[#3F6B4F] mb-3" />
                  <p className="text-3xl font-serif font-bold text-[#1F2E24]">
                    {card.value}
                  </p>
                  <p className="text-xs text-[#8A7F68] mt-1 uppercase tracking-wide">
                    {card.sub}
                  </p>
                  <div className="absolute left-6 right-6 bottom-0 h-px bg-[#B08D57]/30"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-20 bg-[#F7F3E9]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-[#3F6B4F] text-xs font-semibold uppercase tracking-[0.25em]">
              What's Inside
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1F2E24] mt-3">
              Three shelves, one system
            </h2>
            <p className="text-[#6B6354] mt-3 max-w-xl mx-auto">
              Everything a librarian actually reaches for, without the extra
              clutter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#B08D57]/25 rounded-sm overflow-hidden border border-[#B08D57]/25">
            {[
              {
                icon: FaBook,
                title: 'Book Management',
                copy: "Add, edit, and organize your entire collection. Every title's details and availability, always in view.",
              },
              {
                icon: FaBookOpen,
                title: 'Borrow & Return',
                copy: 'A simple loan system with due-date tracking, so nothing quietly disappears off the shelf.',
              },
              {
                icon: FaChartLine,
                title: 'Analytics Dashboard',
                copy: 'Read the shape of your collection at a glance — genres, trends, and turnover, made visible.',
              },
            ].map(f => (
              <div
                key={f.title}
                className="group bg-[#F7F3E9] p-8 hover:bg-white transition-colors duration-300"
              >
                <div className="w-12 h-12 border border-[#3F6B4F] rounded-full flex items-center justify-center text-lg text-[#3F6B4F] mb-5 group-hover:bg-[#3F6B4F] group-hover:text-[#F7F3E9] transition-colors duration-300">
                  <f.icon />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1F2E24] mb-2">
                  {f.title}
                </h3>
                <p className="text-[#6B6354] text-sm leading-relaxed">
                  {f.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== QUICK STATS SECTION ===== */}
      <section className="py-16 bg-[#132018]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#B08D57]/20 border border-[#B08D57]/20">
            {[
              {
                label: 'Total Books',
                value: stats.totalBooks,
                color: '#D8C9A3',
              },
              {
                label: 'Available',
                value: stats.availableBooks,
                color: '#8FBF9F',
              },
              {
                label: 'Borrowed',
                value: stats.borrowedBooks,
                color: '#D9A566',
              },
              {
                label: 'Total Borrows',
                value: stats.totalBorrows,
                color: '#9FC3D8',
              },
            ].map(s => (
              <div
                key={s.label}
                className="bg-[#132018] p-8 text-center hover:bg-[#1A2A20] transition-colors"
              >
                <p
                  className="text-4xl font-serif font-bold"
                  style={{ color: s.color }}
                >
                  {s.value}
                </p>
                <p className="text-white/50 text-xs uppercase tracking-[0.2em] mt-2">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RECENT BOOKS & GENRES ===== */}
      <section className="py-20 bg-[#F7F3E9]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Recent Books */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6 border-b border-[#B08D57]/30 pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#1F2E24] flex items-center gap-2">
                  <FaClock className="text-[#3F6B4F] text-lg" />
                  Recently Added
                </h3>
                <Link
                  to="/books"
                  className="text-[#3F6B4F] hover:text-[#1F2E24] font-medium flex items-center gap-1 text-sm uppercase tracking-wide"
                >
                  View All <FaChevronRight className="text-xs" />
                </Link>
              </div>

              {stats.recentBooks.length === 0 ? (
                <div className="text-center py-14 bg-white/60 border border-dashed border-[#B08D57]/40 rounded-sm">
                  <p className="text-[#8A7F68]">No books added yet</p>
                </div>
              ) : (
                <div className="divide-y divide-[#B08D57]/20 border border-[#B08D57]/20 bg-white/50">
                  {stats.recentBooks.map((book, index) => (
                    <div
                      key={book._id}
                      className="flex items-center justify-between px-5 py-4 hover:bg-white transition group"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs text-[#B08D57] w-6">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <p className="font-serif font-semibold text-[#1F2E24] group-hover:text-[#3F6B4F] transition">
                            {book.title}
                          </p>
                          <p className="text-sm text-[#8A7F68]">
                            by {book.author}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-[11px] px-3 py-1 rounded-full uppercase tracking-wide font-medium ${
                          book.isAvailable
                            ? 'bg-[#3F6B4F]/10 text-[#3F6B4F]'
                            : 'bg-[#B08D57]/15 text-[#8A6A2E]'
                        }`}
                      >
                        {book.isAvailable ? 'Available' : 'Borrowed'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Popular Genres */}
            <div>
              <div className="flex items-center gap-2 mb-6 border-b border-[#B08D57]/30 pb-4">
                <FaStar className="text-[#B08D57] text-lg" />
                <h3 className="font-serif text-2xl font-bold text-[#1F2E24]">
                  Popular Genres
                </h3>
              </div>

              {stats.popularGenres.length === 0 ? (
                <div className="text-center py-14 bg-white/60 border border-dashed border-[#B08D57]/40 rounded-sm">
                  <p className="text-[#8A7F68]">No genres yet</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {stats.popularGenres.map(item => (
                    <div key={item.genre}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-medium text-[#2A2A24] text-sm">
                          {item.genre}
                        </span>
                        <span className="font-mono text-xs text-[#3F6B4F]">
                          {item.count}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-[#B08D57]/15 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#3F6B4F] rounded-full transition-all duration-1000"
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
      <section className="py-20 bg-[#132018] relative overflow-hidden">
        <div className="absolute inset-0 flex opacity-[0.06]">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 border-r border-[#B08D57]"
              style={{
                backgroundColor: i % 4 === 0 ? '#B08D57' : 'transparent',
              }}
            />
          ))}
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <span className="text-[#B08D57] text-xs uppercase tracking-[0.25em]">
              Next Chapter
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
              Ready to organize your library?
            </h2>
            <p className="text-white/60 text-lg mb-9">
              Add your first book and see the shelf come into focus.
            </p>

            <Link
              to="/books"
              className="inline-flex items-center gap-2 bg-[#B08D57] text-[#132018]
                       px-8 py-3.5 rounded-sm hover:bg-[#C7A56C]
                       transition-all duration-300 text-base font-semibold tracking-wide"
            >
              <FaPlus className="text-sm" />
              Browse Books
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#0E1712] text-white/50 py-8 border-t border-[#B08D57]/15">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <FaBook className="text-[#B08D57]" />
              <span className="text-white font-serif font-semibold">
                BookManager
              </span>
              <span className="text-xs font-mono">v2.0.0</span>
            </div>
            <p className="text-sm text-center">
              © 2026 BookManager. All rights reserved. Made by Shamim
            </p>
            <div className="flex items-center gap-5 text-sm">
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
