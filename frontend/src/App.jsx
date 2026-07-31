// App.js
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Books from './pages/Books';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import BorrowedBooks from './pages/BorrowedBooks';
import About from './pages/About';
import ForgotPassword from './pages/ForgotPassword';
// ✅ নতুন পেজ ইম্পোর্ট করুন
import Wishlist from './pages/Wishlist';
import ReadingHistory from './pages/ReadingHistory';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F7F3E9] font-sans text-[#2A2A24]">
        {/* ✅ Toaster Configuration */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
              borderRadius: '8px',
              padding: '16px',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#3F6B4F',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#e74c3c',
                secondary: '#fff',
              },
            },
          }}
        />

        {/* ✅ Navbar */}
        <Navbar />

        <Routes>
          {/* ============================================
              ✅ PUBLIC ROUTES - Login ছাড়া দেখা যাবে
              ============================================ */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* ============================================
              ✅ PROTECTED ROUTES - Login করলেই দেখা যাবে
              ============================================ */}

          {/* 📚 Books */}
          <Route
            path="/books"
            element={
              <ProtectedRoute>
                <Books />
              </ProtectedRoute>
            }
          />

          {/* 📊 Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* 👤 Profile */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* 📖 Borrowed Books */}
          <Route
            path="/borrowed"
            element={
              <ProtectedRoute>
                <BorrowedBooks />
              </ProtectedRoute>
            }
          />

          {/* ❤️ Wishlist - NEW */}
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />

          {/* 📖 Reading History - NEW */}
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <ReadingHistory />
              </ProtectedRoute>
            }
          />

          {/* ============================================
              ✅ 404 Not Found - Redirect to Home
              ============================================ */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
