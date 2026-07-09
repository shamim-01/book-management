import React, { useState, useEffect } from 'react';
import {
  getBooks,
  deleteBook,
  createBook,
  updateBook,
  borrowBook,
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
} from 'react-icons/fa';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await getBooks();
      setBooks(response.data.data || []);
      setFilteredBooks(response.data.data || []);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load books');
      setLoading(false);
    }
  };

  const handleSearch = filters => {
    let filtered = books;
    if (filters.q) {
      filtered = filtered.filter(
        book =>
          book.title.toLowerCase().includes(filters.q.toLowerCase()) ||
          book.author.toLowerCase().includes(filters.q.toLowerCase()),
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

  // ✅ Review Added Handler - এই ফাংশন যোগ করুন
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
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <FaSpinner className="animate-spin text-4xl text-indigo-600 mb-4" />
        <p className="text-gray-500 text-lg">Loading your books...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f0eb]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-purple-700 rounded-2xl shadow-2xl mb-8">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400 rounded-full blur-3xl"></div>
          </div>

          <div className="relative px-6 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-4xl sm:text-5xl">📚</span>
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                      Book Collection
                    </h1>
                    <p className="text-indigo-200 text-sm sm:text-base mt-0.5">
                      Manage your personal book library
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium text-white">
                    <FaBook className="text-indigo-300" />
                    {totalBooks} {totalBooks === 1 ? 'book' : 'books'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-emerald-600 backdrop-blur-sm px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium text-emerald-100">
                    <span className="text-emerald-300">●</span>
                    {availableBooks} available
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-rose-400/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium text-rose-100">
                    <span className="text-rose-300">●</span>
                    {borrowedBooks} borrowed
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  console.log('🔄 Toggle form');
                  setEditingBook(null);
                  setShowForm(!showForm);
                }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 
                         text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-300 
                         font-medium border border-white/20 hover:scale-105 shadow-lg hover:shadow-xl
                         text-sm sm:text-base w-full sm:w-auto justify-center"
              >
                <FaPlus className="text-sm" />
                {showForm ? 'Close Form' : 'Add New Book'}
              </button>
            </div>
          </div>
        </div>

        {/* Book Form */}
        {showForm && (
          <div className="mb-8 animate-fadeIn">
            <BookForm
              initialData={editingBook}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8">
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-5 border border-gray-100/80 hover:border-indigo-200">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-indigo-50 to-emerald-100 p-3.5 rounded-xl">
                <FaBook className="text-indigo-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Books</p>
                <p className="text-2xl font-bold text-gray-800">{totalBooks}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-5 border border-gray-100/80 hover:border-emerald-200">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-3.5 rounded-xl">
                <FaBookOpen className="text-emerald-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Available</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {availableBooks}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-5 border border-gray-100/80 hover:border-rose-200">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-3.5 rounded-xl">
                <FaClock className="text-rose-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Borrowed</p>
                <p className="text-2xl font-bold text-rose-600">
                  {borrowedBooks}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search & View Toggle */}
        <div className="mb-6 space-y-4">
          <AdvancedSearchBar onSearch={handleSearch} />

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing{' '}
              <span className="font-semibold text-gray-700">
                {filteredBooks.length}
              </span>{' '}
              books
            </p>
            <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-sm border border-gray-200/50">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  viewMode === 'grid'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FaThLarge className="text-xs" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  viewMode === 'list'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
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
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="text-7xl mb-4">📭</div>
            <h3 className="text-2xl font-semibold text-gray-700">
              No books found
            </h3>
            <p className="text-gray-400 mt-2">
              {books.length === 0
                ? 'Start by adding your first book to the collection!'
                : 'Try adjusting your search or filters'}
            </p>
            {books.length === 0 && (
              <button
                onClick={() => {
                  setEditingBook(null);
                  setShowForm(true);
                }}
                className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 
                         text-white px-6 py-2.5 rounded-xl hover:from-emerald-700 hover:to-emerald-800 
                         transition-all duration-300 font-medium shadow-md hover:shadow-lg"
              >
                <FaPlus />
                Add Your First Book
              </button>
            )}
          </div>
        ) : (
          <div
            className={`grid gap-5 sm:gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
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
                onReviewAdded={handleReviewAdded} // ✅ এই Prop যোগ করুন
              />
            ))}
          </div>
        )}

        {/* Footer */}
        {filteredBooks.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1.5">
                📚 Total:{' '}
                <strong className="text-gray-800">
                  {filteredBooks.length}
                </strong>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Available:{' '}
                <strong className="text-emerald-600">{availableBooks}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                Borrowed:{' '}
                <strong className="text-rose-600">{borrowedBooks}</strong>
              </span>
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 
                       hover:bg-emerald-600 hover:text-white transition-all duration-300 
                       flex items-center justify-center shadow-sm hover:shadow-md 
                       hover:scale-110"
              aria-label="Back to top"
            >
              <FaArrowUp className="text-sm group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
