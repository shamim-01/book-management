// pages/Books.js
import React, { useState, useEffect } from 'react';
import {
  getBooks,
  deleteBook,
  createBook,
  updateBook,
  borrowBook,
  addToWishlist,
  removeFromWishlist,
  checkWishlist,
} from '../services/api';
import BookCard from '../components/BookCard';
import BookForm from '../components/BookForm';
import AdvancedSearchBar from '../components/AdvancedSearchBar';
import toast from 'react-hot-toast';
import {
  FaPlus,
  FaBook,
  FaBookOpen,
  FaClock,
  FaSpinner,
  FaArrowUp,
  FaThLarge,
  FaList,
  FaGraduationCap,
  FaHeart,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [wishlistStatus, setWishlistStatus] = useState({});
  const [addingToWishlist, setAddingToWishlist] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await getBooks();
      console.log('📚 Books response:', response.data);

      const booksData = response.data.data || response.data.books || [];
      setBooks(booksData);
      setFilteredBooks(booksData);

      // Check wishlist status for each book
      await checkWishlistStatus(booksData);

      setLoading(false);
    } catch (error) {
      console.error('❌ Error fetching books:', error);
      toast.error('Failed to load books');
      setLoading(false);
    }
  };

  // ✅ Check wishlist status for all books
  const checkWishlistStatus = async booksData => {
    try {
      const status = {};
      for (const book of booksData) {
        try {
          const check = await checkWishlist(book._id);
          status[book._id] = check.data.inWishlist;
        } catch (error) {
          status[book._id] = false;
        }
      }
      setWishlistStatus(status);
    } catch (error) {
      console.error('❌ Error checking wishlist:', error);
    }
  };

  // ✅ Add to Wishlist
  const handleAddToWishlist = async bookId => {
    setAddingToWishlist(bookId);
    try {
      await addToWishlist(bookId);
      setWishlistStatus(prev => ({ ...prev, [bookId]: true }));
      toast.success('Added to wishlist ❤️');
    } catch (error) {
      console.error('❌ Error adding to wishlist:', error);
      toast.error(error.response?.data?.message || 'Failed to add to wishlist');
    } finally {
      setAddingToWishlist(null);
    }
  };

  // ✅ Remove from Wishlist
  const handleRemoveFromWishlist = async bookId => {
    setAddingToWishlist(bookId);
    try {
      await removeFromWishlist(bookId);
      setWishlistStatus(prev => ({ ...prev, [bookId]: false }));
      toast.success('Removed from wishlist 💔');
    } catch (error) {
      console.error('❌ Error removing from wishlist:', error);
      toast.error('Failed to remove from wishlist');
    } finally {
      setAddingToWishlist(null);
    }
  };

  const handleSearch = filters => {
    let filtered = books;
    if (filters.q) {
      filtered = filtered.filter(
        book =>
          book.title?.toLowerCase().includes(filters.q.toLowerCase()) ||
          book.author?.toLowerCase().includes(filters.q.toLowerCase()),
      );
    }
    if (filters.genre) {
      filtered = filtered.filter(book => book.genre === filters.genre);
    }
    if (filters.minPrice) {
      filtered = filtered.filter(
        book => book.price >= parseFloat(filters.minPrice),
      );
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(
        book => book.price <= parseFloat(filters.maxPrice),
      );
    }
    setFilteredBooks(filtered);
  };

  // ✅ Add Book
  const handleAddBook = async bookData => {
    console.log('📝 Adding book:', bookData);
    try {
      const response = await createBook(bookData);
      const updatedBooks = [response.data.data, ...books];
      setBooks(updatedBooks);
      setFilteredBooks(updatedBooks);
      await checkWishlistStatus(updatedBooks);
      toast.success('Book added successfully! 🎉');
      setShowForm(false);
      setEditingBook(null);
    } catch (error) {
      console.error('❌ Add error:', error);
      toast.error(error.response?.data?.message || 'Failed to add book');
    }
  };

  // ✅ Update Book
  const handleUpdateBook = async bookData => {
    console.log('✏️ Updating book:', editingBook?._id);
    try {
      const response = await updateBook(editingBook._id, bookData);
      const updatedBooks = books.map(book =>
        book._id === editingBook._id ? response.data.data : book,
      );
      setBooks(updatedBooks);
      setFilteredBooks(updatedBooks);
      await checkWishlistStatus(updatedBooks);
      toast.success('Book updated successfully! 🎉');
      setShowForm(false);
      setEditingBook(null);
    } catch (error) {
      console.error('❌ Update error:', error);
      toast.error(error.response?.data?.message || 'Failed to update book');
    }
  };

  // ✅ Submit
  const handleSubmit = async bookData => {
    console.log('📤 Form submitted:', bookData);
    if (editingBook) {
      await handleUpdateBook(bookData);
    } else {
      await handleAddBook(bookData);
    }
  };

  // ✅ Delete
  const handleDelete = async id => {
    try {
      await deleteBook(id);
      const updatedBooks = books.filter(book => book._id !== id);
      setBooks(updatedBooks);
      setFilteredBooks(updatedBooks);
      // Remove from wishlist status
      setWishlistStatus(prev => {
        const newStatus = { ...prev };
        delete newStatus[id];
        return newStatus;
      });
      toast.success('Book deleted successfully! 🗑️');
    } catch (error) {
      toast.error('Failed to delete book');
    }
  };

  // ✅ Edit
  const handleEdit = book => {
    console.log('✏️ Edit clicked:', book);
    setEditingBook(book);
    setShowForm(true);
  };

  // ✅ Borrow
  const handleBorrow = async borrowData => {
    console.log('📖 Borrowing book:', borrowData);
    try {
      const response = await borrowBook(borrowData);
      console.log('✅ Borrow response:', response.data);
      toast.success(
        `📖 "${response.data.data.book.title}" borrowed successfully!`,
      );
      await fetchBooks();
      return response;
    } catch (error) {
      console.error('❌ Borrow error:', error);
      toast.error(error.response?.data?.message || 'Failed to borrow book');
      throw error;
    }
  };

  // ✅ Review Added Handler
  const handleReviewAdded = async () => {
    console.log('⭐ Review added, refreshing books...');
    await fetchBooks();
    toast.success('Book list updated!');
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingBook(null);
  };

  const totalBooks = filteredBooks.length;
  const availableBooks = filteredBooks.filter(b => b.isAvailable).length;
  const borrowedBooks = totalBooks - availableBooks;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-[#F7F3E9]">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-2 border-[#3F6B4F]/20"></div>
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#3F6B4F] animate-spin"></div>
          <FaBook className="absolute inset-0 m-auto text-[#3F6B4F] text-lg" />
        </div>
        <p className="text-[#5B5347] mt-4 tracking-wide text-sm uppercase">
          Loading your books…
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3E9] font-sans text-[#2A2A24]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero Header */}
        <div className="relative overflow-hidden bg-[#132018] rounded-sm shadow-xl mb-10">
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
          <div className="absolute -top-24 -right-20 w-80 h-80 bg-[#3F6B4F]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-16 w-72 h-72 bg-[#B08D57]/10 rounded-full blur-3xl"></div>

          <div className="relative px-6 sm:px-8 lg:px-10 py-9 sm:py-11 lg:py-12">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 border border-[#B08D57]/50 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaGraduationCap className="text-2xl text-[#B08D57]" />
                  </div>
                  <div>
                    <span className="text-[#B08D57] text-xs uppercase tracking-[0.25em]">
                      The Collection
                    </span>
                    <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                      Book Collection
                    </h1>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 border border-white/15 px-4 py-1.5 rounded-full text-xs uppercase tracking-wide text-white/70">
                    <FaBook className="text-[#B08D57]" />
                    {totalBooks} {totalBooks === 1 ? 'book' : 'books'}
                  </span>
                  <span className="inline-flex items-center gap-2 border border-[#3F6B4F]/50 bg-[#3F6B4F]/15 px-4 py-1.5 rounded-full text-xs uppercase tracking-wide text-[#9FCBAE]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8FBF9F] animate-pulse"></span>
                    {availableBooks} available
                  </span>
                  <span className="inline-flex items-center gap-2 border border-[#8A4A3A]/50 bg-[#8A4A3A]/15 px-4 py-1.5 rounded-full text-xs uppercase tracking-wide text-[#E0A38E]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D9A566]"></span>
                    {borrowedBooks} borrowed
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/wishlist"
                  className="inline-flex items-center gap-2 bg-[#B08D57]/20 hover:bg-[#B08D57]/30 text-[#B08D57] px-4 py-2.5 rounded-sm transition-all duration-300 font-semibold tracking-wide text-sm"
                >
                  <FaHeart className="text-sm" />
                  Wishlist
                </Link>
                <button
                  onClick={() => {
                    console.log('🔄 Toggle form');
                    setEditingBook(null);
                    setShowForm(!showForm);
                  }}
                  className="group inline-flex items-center gap-2 bg-[#B08D57] hover:bg-[#C7A56C]
                           text-[#132018] px-6 py-3 rounded-sm transition-all duration-300
                           font-semibold tracking-wide text-sm sm:text-base w-full sm:w-auto justify-center"
                >
                  <FaPlus className="text-sm group-hover:rotate-90 transition-transform duration-300" />
                  {showForm ? 'Close Form' : 'Add New Book'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Book Form */}
        {showForm && (
          <div className="mb-10 animate-fadeIn">
            <BookForm
              initialData={editingBook}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#B08D57]/20 border border-[#B08D57]/20 mb-10">
          <div className="group bg-white/70 hover:bg-white transition-colors duration-300 p-6">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 flex-shrink-0 border border-[#3F6B4F] rounded-full flex items-center justify-center text-[#3F6B4F] group-hover:bg-[#3F6B4F] group-hover:text-white transition-colors duration-300">
                <FaBook className="text-lg" />
              </div>
              <div>
                <p className="text-xs text-[#8A7F68] font-medium uppercase tracking-wider">
                  Total Books
                </p>
                <p className="font-serif text-3xl font-bold text-[#1F2E24]">
                  {totalBooks}
                </p>
              </div>
            </div>
          </div>

          <div className="group bg-white/70 hover:bg-white transition-colors duration-300 p-6">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 flex-shrink-0 border border-[#3F6B4F] rounded-full flex items-center justify-center text-[#3F6B4F] group-hover:bg-[#3F6B4F] group-hover:text-white transition-colors duration-300">
                <FaBookOpen className="text-lg" />
              </div>
              <div>
                <p className="text-xs text-[#8A7F68] font-medium uppercase tracking-wider">
                  Available
                </p>
                <p className="font-serif text-3xl font-bold text-[#3F6B4F]">
                  {availableBooks}
                </p>
              </div>
            </div>
          </div>

          <div className="group bg-white/70 hover:bg-white transition-colors duration-300 p-6">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 flex-shrink-0 border border-[#8A4A3A] rounded-full flex items-center justify-center text-[#8A4A3A] group-hover:bg-[#8A4A3A] group-hover:text-white transition-colors duration-300">
                <FaClock className="text-lg" />
              </div>
              <div>
                <p className="text-xs text-[#8A7F68] font-medium uppercase tracking-wider">
                  Borrowed
                </p>
                <p className="font-serif text-3xl font-bold text-[#8A4A3A]">
                  {borrowedBooks}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search & View Toggle */}
        <div className="mb-8 space-y-4">
          <div className="bg-white/70 border border-[#B08D57]/20 rounded-sm p-4">
            <AdvancedSearchBar onSearch={handleSearch} />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-[#6B6354]">
              Showing{' '}
              <span className="font-mono font-semibold text-[#1F2E24]">
                {filteredBooks.length}
              </span>{' '}
              {filteredBooks.length === 1 ? 'book' : 'books'}
            </p>
            <div className="flex items-center gap-1 bg-white/70 border border-[#B08D57]/20 rounded-sm p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-sm text-xs uppercase tracking-wide font-medium transition-all duration-300 flex items-center gap-2 ${
                  viewMode === 'grid'
                    ? 'bg-[#3F6B4F] text-white'
                    : 'text-[#6B6354] hover:bg-[#B08D57]/10'
                }`}
              >
                <FaThLarge className="text-xs" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-sm text-xs uppercase tracking-wide font-medium transition-all duration-300 flex items-center gap-2 ${
                  viewMode === 'list'
                    ? 'bg-[#3F6B4F] text-white'
                    : 'text-[#6B6354] hover:bg-[#B08D57]/10'
                }`}
              >
                <FaList className="text-xs" />
                <span className="hidden sm:inline">List</span>
              </button>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        {filteredBooks.length === 0 ? (
          <div className="text-center py-20 bg-white/60 border border-dashed border-[#B08D57]/40 rounded-sm">
            <div className="w-16 h-16 mx-auto border border-[#B08D57] rounded-full flex items-center justify-center text-2xl text-[#B08D57] mb-6">
              <FaBook />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2E24]">
              No books found
            </h3>
            <p className="text-[#8A7F68] mt-3 max-w-md mx-auto">
              {books.length === 0
                ? 'Start your literary journey by adding your first book to the collection!'
                : "Try adjusting your search or filters to find what you're looking for"}
            </p>
            {books.length === 0 && (
              <button
                onClick={() => {
                  setEditingBook(null);
                  setShowForm(true);
                }}
                className="mt-8 inline-flex items-center gap-3 bg-[#B08D57]
                         text-[#132018] px-8 py-3.5 rounded-sm hover:bg-[#C7A56C]
                         transition-all duration-300 font-semibold tracking-wide"
              >
                <FaPlus className="text-sm" />
                Add Your First Book
              </button>
            )}
          </div>
        ) : (
          <div
            className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'
                : 'grid-cols-1'
            }`}
          >
            {filteredBooks.map(book => (
              <BookCard
                key={book._id}
                book={book}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onBorrow={handleBorrow}
                onReviewAdded={handleReviewAdded}
                onAddToWishlist={handleAddToWishlist}
                onRemoveFromWishlist={handleRemoveFromWishlist}
                isInWishlist={wishlistStatus[book._id] || false}
                isAddingToWishlist={addingToWishlist === book._id}
              />
            ))}
          </div>
        )}

        {/* Footer */}
        {filteredBooks.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 p-5 bg-white/70 border border-[#B08D57]/20 rounded-sm">
            <div className="flex flex-wrap items-center gap-6 text-sm text-[#6B6354]">
              <span className="flex items-center gap-2">
                Total:{' '}
                <strong className="font-mono text-[#1F2E24] bg-[#B08D57]/10 px-2.5 py-0.5 rounded-sm">
                  {filteredBooks.length}
                </strong>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#3F6B4F]"></span>
                Available:{' '}
                <strong className="font-mono text-[#3F6B4F]">
                  {availableBooks}
                </strong>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8A4A3A]"></span>
                Borrowed:{' '}
                <strong className="font-mono text-[#8A4A3A]">
                  {borrowedBooks}
                </strong>
              </span>
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group w-11 h-11 rounded-full border border-[#B08D57]
                       text-[#B08D57] hover:bg-[#B08D57] hover:text-[#132018] transition-all duration-300
                       flex items-center justify-center"
              aria-label="Back to top"
            >
              <FaArrowUp className="text-sm group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
