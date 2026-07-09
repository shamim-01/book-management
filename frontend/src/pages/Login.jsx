import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loginUser } from '../services/api';
import {
  FaEnvelope,
  FaLock,
  FaBook,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
} from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    console.log('📝 Login attempt:', { email });

    try {
      const response = await loginUser({ email, password });

      console.log('✅ Login response:', response.data);

      if (response.data.token) {
        // ✅ Save token and user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        toast.success('Login successful! 🎉');
        navigate('/');
      } else {
        toast.error('No token received');
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      console.error('❌ Error response:', error.response?.data);

      const errorMsg =
        error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-white to-emerald-50/30 flex items-center justify-center p-4">
      {/* Back to Home */}
      <Link
        to="/"
        className="absolute top-6 left-6 text-gray-400 hover:text-emerald-700 transition flex items-center gap-2 text-sm group"
      >
        <FaArrowLeft className="group-hover:-translate-x-1 transition" />
        Back to Home
      </Link>

      <div className="w-full max-w-md">
        {/* Brand mark above the card */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center shadow-lg shadow-emerald-900/20 mb-3">
            <FaBook className="text-white text-2xl" />
          </div>
          <span className="text-xl font-bold text-gray-800 tracking-tight">
            Book<span className="text-emerald-700">Manager</span>
          </span>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl shadow-emerald-900/10 border border-white/40 p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">
            Welcome back
          </h2>
          <p className="text-center text-gray-500 mb-7 text-sm">
            Log in to continue to your library
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition outline-none bg-white/50"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-emerald-600 hover:text-emerald-800 font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition outline-none bg-white/50"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-sm" />
                  ) : (
                    <FaEye className="text-sm" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-700 to-emerald-800 text-white py-3 rounded-xl hover:from-emerald-800 hover:to-emerald-900 transition-all duration-300 font-medium shadow-md shadow-emerald-900/20 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                  Logging in...
                </>
              ) : (
                'Log in'
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-emerald-600 font-semibold hover:text-emerald-800 hover:underline transition"
            >
              Create account
            </Link>
          </p>
        </div>

        {/* Version */}
        <p className="text-center text-xs text-gray-400 mt-6">v2.0.0</p>
      </div>
    </div>
  );
};

export default Login;
