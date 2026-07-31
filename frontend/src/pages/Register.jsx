import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaBook,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaCheckCircle,
} from 'react-icons/fa';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    console.log('📝 Register attempt:', { name, email });

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        {
          name,
          email,
          password,
        },
      );

      console.log('✅ Register response:', response.data);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        toast.success('Registration successful!');
        navigate('/');
      } else {
        toast.error('No token received');
      }
    } catch (error) {
      console.error('❌ Register error:', error);
      console.error('❌ Error response:', error.response?.data);

      const errorMsg =
        error.response?.data?.message ||
        'Registration failed. Please try again.';
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
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#3F6B4F]/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#B08D57]/10 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Brand mark above the card */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="w-16 h-16 rounded-sm bg-[#132018] flex items-center justify-center shadow-lg shadow-[#132018]/20 border border-[#B08D57]/30 hover:shadow-[#132018]/30 transition-shadow duration-300">
              <FaBook className="text-[#B08D57] text-2xl" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#3F6B4F] rounded-full flex items-center justify-center shadow-md border border-[#F7F3E9]">
              <span className="text-[10px] text-white font-bold">+</span>
            </div>
          </div>
          <span className="text-xl font-serif font-bold text-[#1F2E24] mt-3 tracking-tight">
            Book<span className="text-[#3F6B4F]">Manager</span>
          </span>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-8 h-[2px] bg-[#B08D57]/50 rounded-full"></div>
            <span className="text-xs text-[#8A7F68] font-medium tracking-wider uppercase">
              Join us
            </span>
            <div className="w-8 h-[2px] bg-[#B08D57]/50 rounded-full"></div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-sm shadow-2xl shadow-[#132018]/10 border border-[#B08D57]/25 p-8 transition-all duration-300">
          <h2 className="font-serif text-3xl font-bold text-center text-[#1F2E24] mb-1 tracking-tight">
            Create account
          </h2>
          <p className="text-center text-[#8A7F68] mb-8 text-sm">
            Start your literary journey today
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="group">
              <label className="block text-xs font-semibold text-[#5B5347] uppercase tracking-wider mb-2 ml-1">
                Full name
              </label>
              <div
                className={`relative transition-all duration-300 ${
                  focused === 'name' ? 'scale-[1.01]' : ''
                }`}
              >
                <div className="relative bg-white rounded-sm shadow-sm border-2 border-[#B08D57]/25 hover:border-[#B08D57]/50 focus-within:border-[#3F6B4F] focus-within:shadow-lg focus-within:shadow-[#3F6B4F]/10 transition-all duration-300">
                  <FaUser
                    className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm transition-colors duration-300 ${
                      focused === 'name' ? 'text-[#3F6B4F]' : 'text-[#B08D57]'
                    }`}
                  />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    className="w-full pl-12 pr-4 py-3.5 bg-transparent rounded-sm focus:outline-none text-[#1F2E24] placeholder:text-[#8A7F68]/60"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="group">
              <label className="block text-xs font-semibold text-[#5B5347] uppercase tracking-wider mb-2 ml-1">
                Email address
              </label>
              <div
                className={`relative transition-all duration-300 ${
                  focused === 'email' ? 'scale-[1.01]' : ''
                }`}
              >
                <div className="relative bg-white rounded-sm shadow-sm border-2 border-[#B08D57]/25 hover:border-[#B08D57]/50 focus-within:border-[#3F6B4F] focus-within:shadow-lg focus-within:shadow-[#3F6B4F]/10 transition-all duration-300">
                  <FaEnvelope
                    className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm transition-colors duration-300 ${
                      focused === 'email' ? 'text-[#3F6B4F]' : 'text-[#B08D57]'
                    }`}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    className="w-full pl-12 pr-4 py-3.5 bg-transparent rounded-sm focus:outline-none text-[#1F2E24] placeholder:text-[#8A7F68]/60"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="group">
              <label className="block text-xs font-semibold text-[#5B5347] uppercase tracking-wider mb-2 ml-1">
                Password
              </label>
              <div
                className={`relative transition-all duration-300 ${
                  focused === 'password' ? 'scale-[1.01]' : ''
                }`}
              >
                <div className="relative bg-white rounded-sm shadow-sm border-2 border-[#B08D57]/25 hover:border-[#B08D57]/50 focus-within:border-[#3F6B4F] focus-within:shadow-lg focus-within:shadow-[#3F6B4F]/10 transition-all duration-300">
                  <FaLock
                    className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm transition-colors duration-300 ${
                      focused === 'password'
                        ? 'text-[#3F6B4F]'
                        : 'text-[#B08D57]'
                    }`}
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused(null)}
                    className="w-full pl-12 pr-12 py-3.5 bg-transparent rounded-sm focus:outline-none text-[#1F2E24] placeholder:text-[#8A7F68]/60"
                    placeholder="Min 6 characters"
                    required
                    minLength="6"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A7F68] hover:text-[#3F6B4F] transition-colors duration-300"
                    tabIndex={-1}
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-sm" />
                    ) : (
                      <FaEye className="text-sm" />
                    )}
                  </button>
                </div>
              </div>
              {password && password.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1 bg-[#B08D57]/15 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        password.length >= 6 ? 'bg-[#3F6B4F]' : 'bg-[#D9A566]'
                      }`}
                      style={{
                        width: `${Math.min((password.length / 6) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      password.length >= 6 ? 'text-[#3F6B4F]' : 'text-[#B08D57]'
                    }`}
                  >
                    {password.length >= 6 ? 'Strong' : `${password.length}/6`}
                  </span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="relative w-full group overflow-hidden rounded-sm bg-[#B08D57] text-[#132018] py-3.5 font-semibold tracking-wide shadow-lg shadow-[#132018]/10 hover:bg-[#C7A56C] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-[#132018]/30 border-t-[#132018] rounded-full animate-spin"></span>
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#B08D57]/20">
            <p className="text-center text-[#5B5347] text-sm">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-[#3F6B4F] hover:text-[#1F2E24] transition-colors duration-200 inline-flex items-center gap-1 group"
              >
                Log in
                <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            </p>

            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="flex items-center gap-1.5">
                <FaCheckCircle className="text-[#3F6B4F] text-[10px]" />
                <span className="text-[11px] text-[#8A7F68] uppercase tracking-wide">
                  Secure
                </span>
              </div>
              <div className="w-px h-3 bg-[#B08D57]/25"></div>
              <div className="flex items-center gap-1.5">
                <FaCheckCircle className="text-[#3F6B4F] text-[10px]" />
                <span className="text-[11px] text-[#8A7F68] uppercase tracking-wide">
                  Free
                </span>
              </div>
              <div className="w-px h-3 bg-[#B08D57]/25"></div>
              <div className="flex items-center gap-1.5">
                <FaCheckCircle className="text-[#3F6B4F] text-[10px]" />
                <span className="text-[11px] text-[#8A7F68] uppercase tracking-wide">
                  24/7
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
