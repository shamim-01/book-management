const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// ✅ CORS - Production Ready (সব Origin Allow)
app.use(
  cors({
    origin: '*', // ✅ সব Origin থেকে Request Allow
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// ✅ অথবা নির্দিষ্ট Origin Allow করতে:
// app.use(
//   cors({
//     origin: [
//       'http://localhost:5173',
//       'https://book-management-gold-seven.vercel.app',
//       'https://book-management.vercel.app'
//     ],
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization']
//   })
// );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
connectDB();

// ✅ Routes
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/borrow', require('./routes/borrowRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));

// ✅ Root Route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Book Management API',
    version: '1.0.0',
    endpoints: {
      books: 'GET /api/books',
      auth: 'POST /api/auth/register, POST /api/auth/login',
      borrow: 'GET /api/borrow, POST /api/borrow',
      dashboard: 'GET /api/dashboard/stats',
      reviews: 'GET /api/reviews/:bookId, POST /api/reviews/:bookId',
    },
  });
});

// ✅ Test Route
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'API is working!',
    database: mongoose.connection.name || 'Not connected',
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 Books API: http://localhost:${PORT}/api/books`);
  console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth`);
  console.log(`✅ MongoDB: ${mongoose.connection.name || 'Connecting...'}`);
});
