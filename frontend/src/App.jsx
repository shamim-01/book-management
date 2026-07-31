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
import ForgotPassword from './pages/ForgotPassword'; // ✅ নতুন যোগ করুন

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

        {/* ✅ Navbar - শুধু Public রাউটে দেখাবে না */}
        <Navbar />

        <Routes>
          {/* ✅ Public Routes - Login ছাড়া দেখা যাবে */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />

          {/* ✅ Forgot Password Route - Public */}
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* ✅ Protected Routes - Login করলেই দেখা যাবে */}
          <Route
            path="/books"
            element={
              <ProtectedRoute>
                <Books />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/borrowed"
            element={
              <ProtectedRoute>
                <BorrowedBooks />
              </ProtectedRoute>
            }
          />

          {/* ✅ 404 Not Found - Redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
