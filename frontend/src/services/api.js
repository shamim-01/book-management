// services/api.js
import axios from 'axios';

// ✅ Environment Variable থেকে URL নিন
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Request Interceptor - Token যোগ করা হয়েছে
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`📤 ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  error => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  },
);

// ✅ Response Interceptor - 401 Unauthorized Handle
api.interceptors.response.use(
  response => {
    console.log(`📥 ${response.status} ${response.config.url}`);
    return response;
  },
  error => {
    console.error('❌ API Error:', error.response?.data || error.message);

    // ✅ If 401 Unauthorized, redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  },
);

// ============================================
// 🔐 AUTH API CALLS
// ============================================

export const registerUser = async userData => {
  console.log('📝 Registering user:', userData);
  try {
    const response = await api.post('/auth/register', userData);
    console.log('✅ User registered:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Error registering user:', error);
    throw error;
  }
};

export const loginUser = async userData => {
  console.log('📝 Logging in user:', userData);
  try {
    const response = await api.post('/auth/login', userData);
    console.log('✅ User logged in:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Error logging in user:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  console.log('📡 Fetching current user...');
  try {
    const response = await api.get('/auth/me');
    console.log('✅ Current user:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Error fetching current user:', error);
    throw error;
  }
};

// ✅ Forgot Password APIs
export const forgotPassword = async data => {
  console.log('📧 Sending forgot password request:', data);
  try {
    const response = await api.post('/auth/forgot-password', data);
    console.log('✅ OTP sent:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Error sending forgot password:', error);
    throw error;
  }
};

export const verifyOTP = async data => {
  console.log('🔐 Verifying OTP:', data);
  try {
    const response = await api.post('/auth/verify-otp', data);
    console.log('✅ OTP verified:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Error verifying OTP:', error);
    throw error;
  }
};

export const resetPassword = async data => {
  console.log('🔑 Resetting password:', data);
  try {
    const response = await api.post('/auth/reset-password', data);
    console.log('✅ Password reset:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Error resetting password:', error);
    throw error;
  }
};

// ✅ Profile APIs
export const updateProfile = async userData => {
  console.log('✏️ Updating profile:', userData);
  try {
    const response = await api.put('/auth/profile', userData);
    console.log('✅ Profile updated:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Error updating profile:', error);
    throw error;
  }
};

export const changePassword = async passwordData => {
  console.log('🔐 Changing password');
  try {
    const response = await api.put('/auth/change-password', passwordData);
    console.log('✅ Password changed:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Error changing password:', error);
    throw error;
  }
};

export const deleteAccount = async password => {
  console.log('🗑️ Deleting account');
  try {
    const response = await api.delete('/auth/account', { data: { password } });
    console.log('✅ Account deleted:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Error deleting account:', error);
    throw error;
  }
};

// ============================================
// 📚 BOOK API CALLS
// ============================================

export const getBooks = async () => {
  console.log('📡 Fetching books from API...');
  try {
    const response = await api.get('/books');
    console.log('✅ Books fetched:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Error fetching books:', error);
    throw error;
  }
};

export const getBook = async id => {
  console.log(`📡 Fetching book ${id}...`);
  try {
    const response = await api.get(`/books/${id}`);
    return response;
  } catch (error) {
    console.error('❌ Error fetching book:', error);
    throw error;
  }
};

export const createBook = async bookData => {
  console.log('📝 Creating book:', bookData);
  try {
    const response = await api.post('/books', bookData);
    console.log('✅ Book created:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Error creating book:', error);
    throw error;
  }
};

export const updateBook = async (id, bookData) => {
  console.log(`✏️ Updating book ${id}:`, bookData);
  try {
    const response = await api.put(`/books/${id}`, bookData);
    console.log('✅ Book updated:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Error updating book:', error);
    throw error;
  }
};

export const deleteBook = async id => {
  console.log(`🗑️ Deleting book ${id}`);
  try {
    const response = await api.delete(`/books/${id}`);
    console.log('✅ Book deleted:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Error deleting book:', error);
    throw error;
  }
};

// ============================================
// ⭐ REVIEW API CALLS
// ============================================

export const getReviews = async bookId => {
  console.log(`📡 Fetching reviews for book ${bookId}...`);
  try {
    const response = await api.get(`/reviews/${bookId}`);
    console.log('✅ Reviews fetched:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Error fetching reviews:', error);
    throw error;
  }
};

export const createReview = async (bookId, reviewData) => {
  console.log('📝 Creating review for book:', bookId, reviewData);
  try {
    const response = await api.post(`/reviews/${bookId}`, reviewData);
    console.log('✅ Review created:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Error creating review:', error);
    throw error;
  }
};

export const updateReview = async (reviewId, reviewData) => {
  console.log(`✏️ Updating review ${reviewId}:`, reviewData);
  try {
    const response = await api.put(`/reviews/${reviewId}`, reviewData);
    console.log('✅ Review updated:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Error updating review:', error);
    throw error;
  }
};

export const deleteReview = async reviewId => {
  console.log(`🗑️ Deleting review ${reviewId}`);
  try {
    const response = await api.delete(`/reviews/${reviewId}`);
    console.log('✅ Review deleted:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Error deleting review:', error);
    throw error;
  }
};

// ============================================
// 📖 BORROW API CALLS
// ============================================

export const borrowBook = async borrowData => {
  console.log('📖 Borrowing book:', borrowData);
  try {
    const response = await api.post('/borrow', borrowData);
    console.log('✅ Book borrowed:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Error borrowing book:', error);
    throw error;
  }
};

export const returnBook = async borrowId => {
  console.log('🔄 Returning book:', borrowId);
  try {
    const response = await api.put(`/borrow/${borrowId}/return`);
    console.log('✅ Book returned:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Error returning book:', error);
    throw error;
  }
};

export const getBorrows = async () => {
  console.log('📡 Fetching borrows...');
  try {
    const response = await api.get('/borrow');
    return response;
  } catch (error) {
    console.error('❌ Error fetching borrows:', error);
    throw error;
  }
};

export const getActiveBorrows = async () => {
  console.log('📡 Fetching active borrows...');
  try {
    const response = await api.get('/borrow/active');
    return response;
  } catch (error) {
    console.error('❌ Error fetching active borrows:', error);
    throw error;
  }
};

export const getBorrowsByBook = async bookId => {
  console.log(`📡 Fetching borrows for book ${bookId}...`);
  try {
    const response = await api.get(`/borrow/book/${bookId}`);
    return response;
  } catch (error) {
    console.error('❌ Error fetching borrows by book:', error);
    throw error;
  }
};

// ============================================
// ❤️ WISHLIST API CALLS
// ============================================

export const getWishlist = async () => {
  console.log('📡 Fetching wishlist...');
  try {
    const response = await api.get('/wishlist');
    console.log('✅ Wishlist fetched:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Error fetching wishlist:', error);
    throw error;
  }
};

export const addToWishlist = async bookId => {
  console.log(`❤️ Adding book ${bookId} to wishlist...`);
  try {
    const response = await api.post(`/wishlist/${bookId}`);
    console.log('✅ Added to wishlist:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Error adding to wishlist:', error);
    throw error;
  }
};

export const removeFromWishlist = async bookId => {
  console.log(`💔 Removing book ${bookId} from wishlist...`);
  try {
    const response = await api.delete(`/wishlist/${bookId}`);
    console.log('✅ Removed from wishlist:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Error removing from wishlist:', error);
    throw error;
  }
};

export const checkWishlist = async bookId => {
  console.log(`🔍 Checking wishlist for book ${bookId}...`);
  try {
    const response = await api.get(`/wishlist/check/${bookId}`);
    console.log('✅ Wishlist check:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Error checking wishlist:', error);
    throw error;
  }
};

// ============================================
// 🎯 READING CHALLENGE API CALLS
// ============================================

export const getChallenge = async year => {
  console.log(`📡 Fetching reading challenge for year ${year || 'current'}...`);
  try {
    const response = await api.get(`/challenge${year ? `?year=${year}` : ''}`);
    console.log('✅ Challenge fetched:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Error fetching challenge:', error);
    throw error;
  }
};

export const createChallenge = async data => {
  console.log('🎯 Creating reading challenge:', data);
  try {
    const response = await api.post('/challenge', data);
    console.log('✅ Challenge created:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Error creating challenge:', error);
    throw error;
  }
};

export const updateChallenge = async (id, data) => {
  console.log(`✏️ Updating challenge ${id}:`, data);
  try {
    const response = await api.put(`/challenge/${id}`, data);
    console.log('✅ Challenge updated:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Error updating challenge:', error);
    throw error;
  }
};

export const deleteChallenge = async id => {
  console.log(`🗑️ Deleting challenge ${id}...`);
  try {
    const response = await api.delete(`/challenge/${id}`);
    console.log('✅ Challenge deleted:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Error deleting challenge:', error);
    throw error;
  }
};

// ============================================
// 📖 READING HISTORY API CALLS
// ============================================

export const getHistory = async () => {
  console.log('📡 Fetching reading history...');
  try {
    const response = await api.get('/history');
    console.log('✅ History fetched:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Error fetching history:', error);
    throw error;
  }
};

export const addHistory = async data => {
  console.log('📝 Adding to reading history:', data);
  try {
    const response = await api.post('/history', data);
    console.log('✅ Added to history:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Error adding to history:', error);
    throw error;
  }
};

export const updateHistory = async (id, data) => {
  console.log(`✏️ Updating history ${id}:`, data);
  try {
    const response = await api.put(`/history/${id}`, data);
    console.log('✅ History updated:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Error updating history:', error);
    throw error;
  }
};

export const deleteHistory = async id => {
  console.log(`🗑️ Deleting history ${id}...`);
  try {
    const response = await api.delete(`/history/${id}`);
    console.log('✅ History deleted:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Error deleting history:', error);
    throw error;
  }
};

export const getReadingStats = async () => {
  console.log('📊 Fetching reading statistics...');
  try {
    const response = await api.get('/history/stats');
    console.log('✅ Stats fetched:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Error fetching stats:', error);
    throw error;
  }
};

// ============================================
// 📊 DASHBOARD API CALLS
// ============================================

export const getDashboardStats = async () => {
  console.log('📊 Fetching dashboard stats...');
  try {
    const response = await api.get('/dashboard/stats');
    console.log('📊 Dashboard stats received:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Error fetching dashboard stats:', error);
    throw error;
  }
};

// ============================================
// 📤 EXPORT DEFAULT
// ============================================

export default api;
