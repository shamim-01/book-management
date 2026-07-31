const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// CORS - Production Ready (Allowing multiple origins)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://book-management-gold-seven.vercel.app',
  'https://book-management.vercel.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        process.env.NODE_ENV === 'development'
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
connectDB();

// Routes
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/borrow', require('./routes/borrowRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));

// Root Route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Book Management API',
    version: '2.0.0',
    endpoints: {
      books:
        'GET /api/books, POST /api/books, PUT /api/books/:id, DELETE /api/books/:id',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        forgotPassword: 'POST /api/auth/forgot-password',
        verifyOTP: 'POST /api/auth/verify-otp',
        resetPassword: 'POST /api/auth/reset-password',
        getProfile: 'GET /api/auth/profile',
        updateProfile: 'PUT /api/auth/profile',
      },
      borrow:
        'GET /api/borrow, POST /api/borrow, PUT /api/borrow/:id, DELETE /api/borrow/:id',
      dashboard: 'GET /api/dashboard/stats',
      reviews:
        'GET /api/reviews/:bookId, POST /api/reviews/:bookId, DELETE /api/reviews/:id',
    },
  });
});

// Test Route
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'API is working!',
    database: mongoose.connection.name || 'Not connected',
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 Books API: http://localhost:${PORT}/api/books`);
  console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth`);
  console.log(`✅ MongoDB: ${mongoose.connection.name || 'Connecting...'}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
