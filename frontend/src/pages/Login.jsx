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
    <div className="min-h-screen bg-[#F7F3E9] font-sans text-[#2A2A24] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Book-spine texture bars */}
      <div className="absolute inset-0 flex opacity-[0.05]">
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
      <div className="absolute -top-24 -right-24 w-[24rem] h-[24rem] bg-[#3F6B4F]/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-24 w-[22rem] h-[22rem] bg-[#B08D57]/10 rounded-full blur-3xl"></div>

      {/* Back to Home */}
      <Link
        to="/"
        className="absolute top-6 left-6 text-[#8A7F68] hover:text-[#3F6B4F] transition flex items-center gap-2 text-sm group z-10"
      >
        <FaArrowLeft className="group-hover:-translate-x-1 transition" />
        Back to Home
      </Link>

      <div className="relative w-full max-w-md">
        {/* Brand mark above the card */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-sm bg-[#132018] flex items-center justify-center shadow-lg shadow-[#132018]/20 mb-3 border border-[#B08D57]/30">
            <FaBook className="text-[#B08D57] text-2xl" />
          </div>
          <span className="text-xl font-serif font-bold text-[#1F2E24] tracking-tight">
            Book<span className="text-[#3F6B4F]">Manager</span>
          </span>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-sm shadow-2xl shadow-[#132018]/10 border border-[#B08D57]/25 p-8">
          <h2 className="font-serif text-2xl font-bold text-center text-[#1F2E24] mb-1">
            Welcome back
          </h2>
          <p className="text-center text-[#8A7F68] mb-7 text-sm">
            Log in to continue to your library
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#5B5347] mb-1.5 uppercase tracking-wide text-xs">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B08D57] text-sm" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#B08D57]/30 rounded-sm focus:ring-2 focus:ring-[#3F6B4F]/20 focus:border-[#3F6B4F] transition outline-none bg-white/60"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-[#5B5347] uppercase tracking-wide text-xs">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-[#3F6B4F] hover:text-[#1F2E24] font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B08D57] text-sm" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-3 border border-[#B08D57]/30 rounded-sm focus:ring-2 focus:ring-[#3F6B4F]/20 focus:border-[#3F6B4F] transition outline-none bg-white/60"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A7F68] hover:text-[#3F6B4F] transition"
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
              className="w-full bg-[#B08D57] text-[#132018] py-3 rounded-sm hover:bg-[#C7A56C] transition-all duration-300 font-semibold tracking-wide shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#132018]/30 border-t-[#132018] rounded-full animate-spin"></span>
                  Logging in...
                </>
              ) : (
                'Log in'
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-[#B08D57]/25"></div>
            <span className="text-xs text-[#8A7F68] uppercase tracking-wide">
              or
            </span>
            <div className="flex-1 h-px bg-[#B08D57]/25"></div>
          </div>

          <p className="mt-6 text-center text-[#5B5347] text-sm">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-[#3F6B4F] font-semibold hover:text-[#1F2E24] hover:underline transition"
            >
              Create account
            </Link>
          </p>
        </div>

        {/* Version */}
        <p className="text-center text-xs text-[#8A7F68] mt-6 font-mono">
          v2.0.0
        </p>
      </div>
    </div>
  );
};

export default Login;
