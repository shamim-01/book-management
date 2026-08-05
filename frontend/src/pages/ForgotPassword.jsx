
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { forgotPassword, verifyOTP, resetPassword } from '../services/api';
import {
  FaEnvelope,
  FaArrowLeft,
  FaKey,
  FaCheck,
  FaSpinner,
  FaLock,
} from 'react-icons/fa';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  //  Step 1: Send OTP
  const handleSendOTP = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      await forgotPassword({ email });
      toast.success('OTP sent! Check console for OTP');
      setStep(2);
      startTimer(60);
    } catch (error) {
      console.error('❌ Forgot password error:', error);
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  //  Step 2: Verify OTP
  const handleVerifyOTP = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      await verifyOTP({ email, otp });
      toast.success('OTP verified successfully! ✅');
      setStep(3);
    } catch (error) {
      console.error('❌ OTP verification error:', error);
      toast.error(error.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  //  Step 3: Reset Password
  const handleResetPassword = async e => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await resetPassword({ email, otp, newPassword });
      toast.success('Password reset successfully! 🎉');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error('❌ Reset password error:', error);
      toast.error(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  //  Resend OTP
  const handleResendOTP = async () => {
    setResendLoading(true);
    try {
      await forgotPassword({ email });
      toast.success('New OTP sent!');
      startTimer(60);
    } catch (error) {
      toast.error('Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  const startTimer = duration => {
    setTimer(duration);
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F7F3E9] flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm rounded-sm shadow-2xl border border-[#B08D57]/25 p-8">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition ${
                    step === s
                      ? 'bg-[#3F6B4F] text-white'
                      : step > s
                        ? 'bg-[#B08D57] text-white'
                        : 'bg-[#E5E0D6] text-[#8A7F68]'
                  }`}
                >
                  {step > s ? <FaCheck className="text-xs" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-10 h-0.5 transition ${
                      step > s ? 'bg-[#B08D57]' : 'bg-[#E5E0D6]'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Email */}
          {step === 1 && (
            <>
              <h2 className="font-serif text-2xl font-bold text-center text-[#1F2E24] mb-1">
                Forgot Password
              </h2>
              <p className="text-center text-[#8A7F68] mb-7 text-sm">
                Enter your email to receive OTP
              </p>

              <form onSubmit={handleSendOTP} className="space-y-5">
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#B08D57] text-[#132018] py-3 rounded-sm hover:bg-[#C7A56C] transition-all duration-300 font-semibold tracking-wide shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    'Send OTP'
                  )}
                </button>
              </form>
            </>
          )}

          {/* Step 2: OTP Verification */}
          {step === 2 && (
            <>
              <h2 className="font-serif text-2xl font-bold text-center text-[#1F2E24] mb-1">
                Verify OTP
              </h2>
              <p className="text-center text-[#8A7F68] mb-7 text-sm">
                Enter the 6-digit code sent to {email}
              </p>

              <form onSubmit={handleVerifyOTP} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#5B5347] mb-1.5 uppercase tracking-wide text-xs">
                    OTP Code
                  </label>
                  <div className="relative">
                    <FaKey className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B08D57] text-sm" />
                    <input
                      type="text"
                      value={otp}
                      onChange={e =>
                        setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))
                      }
                      className="w-full pl-10 pr-4 py-3 border border-[#B08D57]/30 rounded-sm focus:ring-2 focus:ring-[#3F6B4F]/20 focus:border-[#3F6B4F] transition outline-none bg-white/60"
                      placeholder="Enter 6-digit OTP"
                      maxLength="6"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Check Render Logs for OTP
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#3F6B4F] text-white py-3 rounded-sm hover:bg-[#345A42] transition-all duration-300 font-semibold tracking-wide shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify OTP'
                  )}
                </button>

                <div className="text-center">
                  {timer > 0 ? (
                    <p className="text-sm text-[#8A7F68]">
                      Resend OTP in {timer}s
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={resendLoading}
                      className="text-sm text-[#3F6B4F] hover:text-[#1F2E24] font-medium transition"
                    >
                      {resendLoading ? (
                        <FaSpinner className="animate-spin inline mr-1" />
                      ) : null}
                      Resend OTP
                    </button>
                  )}
                </div>
              </form>
            </>
          )}

          {/* Step 3: Reset Password */}
          {step === 3 && (
            <>
              <h2 className="font-serif text-2xl font-bold text-center text-[#1F2E24] mb-1">
                Set New Password
              </h2>
              <p className="text-center text-[#8A7F68] mb-7 text-sm">
                Create a new password for your account
              </p>

              <form onSubmit={handleResetPassword} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#5B5347] mb-1.5 uppercase tracking-wide text-xs">
                    New Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B08D57] text-sm" />
                    <input
                      type="password"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-[#B08D57]/30 rounded-sm focus:ring-2 focus:ring-[#3F6B4F]/20 focus:border-[#3F6B4F] transition outline-none bg-white/60"
                      placeholder="Min 6 characters"
                      required
                      minLength="6"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#5B5347] mb-1.5 uppercase tracking-wide text-xs">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B08D57] text-sm" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-[#B08D57]/30 rounded-sm focus:ring-2 focus:ring-[#3F6B4F]/20 focus:border-[#3F6B4F] transition outline-none bg-white/60"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#3F6B4F] text-white py-3 rounded-sm hover:bg-[#345A42] transition-all duration-300 font-semibold tracking-wide shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Resetting...
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
