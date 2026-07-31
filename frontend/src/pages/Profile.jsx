// pages/Profile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaEdit,
  FaSave,
  FaTimes,
  FaUserCircle,
  FaBook,
  FaHeart,
  FaCalendarAlt,
  FaStar,
  FaSpinner,
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import { getCurrentUser, updateProfile } from '../services/api';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchUser();
  }, []);

  // ✅ Fetch logged-in user data from API
  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await getCurrentUser();
      console.log('✅ User data:', response.data);

      if (response.data && response.data.user) {
        setUser(response.data.user);
        setFormData(response.data.user);
      } else {
        toast.error('Failed to load user data');
        navigate('/login');
      }
    } catch (error) {
      console.error('❌ Error fetching user:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      } else {
        toast.error('Failed to load profile');
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Profile Update
  const handleProfileUpdate = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await updateProfile(formData);
      setUser(response.data.user);
      setIsEditing(false);
      toast.success('Profile updated successfully! 🎉');
      localStorage.setItem('user', JSON.stringify(response.data.user));
    } catch (error) {
      console.error('❌ Update error:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  // ✅ Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F3E9] flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-[#3F6B4F] mx-auto" />
          <p className="mt-4 text-[#6B6354]">Loading profile...</p>
        </div>
      </div>
    );
  }

  // ✅ If no user, show message
  if (!user) {
    return (
      <div className="min-h-screen bg-[#F7F3E9] flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <FaUserCircle className="text-6xl text-[#B08D57] mx-auto mb-4" />
          <h2 className="text-2xl font-serif text-[#132018] mb-2">
            No User Logged In
          </h2>
          <p className="text-[#6B6354]">Please login to view your profile</p>
          <button
            onClick={() => navigate('/login')}
            className="mt-4 bg-[#B08D57] text-[#132018] px-6 py-2 rounded hover:bg-[#C7A56C] transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3E9] font-sans text-[#2A2A24]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* ===== HEADER ===== */}
        <div className="relative overflow-hidden bg-[#132018] rounded-sm shadow-xl mb-10">
          <div className="absolute inset-0 flex opacity-[0.08]">
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
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#3F6B4F]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-16 w-64 h-64 bg-[#B08D57]/10 rounded-full blur-3xl"></div>

          <div className="relative px-6 sm:px-8 lg:px-10 py-9 sm:py-11 lg:py-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
              <div>
                <span className="text-[#B08D57] text-xs uppercase tracking-[0.25em]">
                  Reader's Card
                </span>
                <div className="flex items-center gap-3 mt-2">
                  <div className="w-11 h-11 border border-[#B08D57]/50 rounded-full flex items-center justify-center text-[#B08D57] flex-shrink-0">
                    <FaUserCircle />
                  </div>
                  <div>
                    <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                      Profile
                    </h1>
                    <p className="text-white/50 text-sm sm:text-base mt-0.5">
                      Manage your personal information
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center gap-2 bg-[#B08D57] hover:bg-[#C7A56C] text-[#132018] px-5 sm:px-6 py-2.5 rounded-sm transition-all duration-300 font-semibold tracking-wide text-sm sm:text-base"
              >
                {isEditing ? (
                  <>
                    <FaTimes className="text-sm" />
                    Cancel Editing
                  </>
                ) : (
                  <>
                    <FaEdit className="text-sm" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ===== PROFILE CARD ===== */}
        <div className="bg-white/70 border border-[#B08D57]/25 rounded-sm overflow-hidden max-w-4xl mx-auto">
          {/* Cover strip */}
          <div className="h-24 bg-[#132018] relative">
            <div className="absolute inset-0 flex opacity-[0.1]">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 border-r border-[#B08D57]"
                  style={{
                    backgroundColor: i % 3 === 0 ? '#B08D57' : 'transparent',
                  }}
                />
              ))}
            </div>
            <div className="absolute -bottom-10 left-8">
              <div className="w-20 h-20 rounded-full bg-[#F7F3E9] p-1 border border-[#B08D57]/40">
                <div className="w-full h-full rounded-full bg-[#3F6B4F]/10 flex items-center justify-center">
                  <FaUserCircle className="text-4xl text-[#3F6B4F]" />
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-12 px-8 pb-8">
            {isEditing ? (
              // ===== EDIT FORM =====
              <form onSubmit={handleProfileUpdate} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-[#6B6354] uppercase tracking-wide mb-1.5 flex items-center gap-2">
                      <FaUser className="text-[#3F6B4F] text-xs" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-[#B08D57]/30 rounded-sm bg-white focus:outline-none focus:border-[#3F6B4F] transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#6B6354] uppercase tracking-wide mb-1.5 flex items-center gap-2">
                      <FaEnvelope className="text-[#3F6B4F] text-xs" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-[#B08D57]/30 rounded-sm bg-white focus:outline-none focus:border-[#3F6B4F] transition"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-[#6B6354] uppercase tracking-wide mb-1.5 flex items-center gap-2">
                      <FaPhone className="text-[#3F6B4F] text-xs" />
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-[#B08D57]/30 rounded-sm bg-white focus:outline-none focus:border-[#3F6B4F] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#6B6354] uppercase tracking-wide mb-1.5 flex items-center gap-2">
                      <FaHeart className="text-[#3F6B4F] text-xs" />
                      Favorite Genre
                    </label>
                    <input
                      type="text"
                      name="favoriteGenre"
                      value={formData.favoriteGenre || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-[#B08D57]/30 rounded-sm bg-white focus:outline-none focus:border-[#3F6B4F] transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#6B6354] uppercase tracking-wide mb-1.5 flex items-center gap-2">
                    <FaBook className="text-[#3F6B4F] text-xs" />
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio || ''}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2.5 border border-[#B08D57]/30 rounded-sm bg-white focus:outline-none focus:border-[#3F6B4F] transition"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#3F6B4F] text-white py-3 rounded-sm hover:bg-[#345A42] transition-all duration-300 text-sm font-medium uppercase tracking-wide disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      <FaSave className="text-sm" />
                    )}
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 inline-flex items-center justify-center gap-2 border border-[#B08D57]/40 text-[#6B6354] py-3 rounded-sm hover:bg-[#B08D57]/10 transition-all duration-300 text-sm font-medium uppercase tracking-wide"
                  >
                    <FaTimes className="text-sm" />
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              // ===== VIEW PROFILE =====
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#1F2E24]">
                    {user.name} {/* ✅ Dynamic Name */}
                  </h2>
                  <p className="text-[#6B6354] text-sm mt-1">
                    {user.bio || 'Book lover'}
                  </p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#B08D57]/20 border border-[#B08D57]/20 pt-2">
                  <div className="flex items-center gap-4 p-4 bg-[#F7F3E9] hover:bg-white transition">
                    <div className="w-10 h-10 flex-shrink-0 border border-[#3F6B4F] rounded-full flex items-center justify-center text-[#3F6B4F]">
                      <FaEnvelope className="text-sm" />
                    </div>
                    <div>
                      <p className="text-xs text-[#8A7F68] font-medium uppercase tracking-wide">
                        Email
                      </p>
                      <p className="font-medium text-[#1F2E24]">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-[#F7F3E9] hover:bg-white transition">
                    <div className="w-10 h-10 flex-shrink-0 border border-[#3F6B4F] rounded-full flex items-center justify-center text-[#3F6B4F]">
                      <FaPhone className="text-sm" />
                    </div>
                    <div>
                      <p className="text-xs text-[#8A7F68] font-medium uppercase tracking-wide">
                        Phone
                      </p>
                      <p className="font-medium text-[#1F2E24]">
                        {user.phone || 'Not set'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-[#F7F3E9] hover:bg-white transition">
                    <div className="w-10 h-10 flex-shrink-0 border border-[#B08D57] rounded-full flex items-center justify-center text-[#B08D57]">
                      <FaHeart className="text-sm" />
                    </div>
                    <div>
                      <p className="text-xs text-[#8A7F68] font-medium uppercase tracking-wide">
                        Favorite Genre
                      </p>
                      <p className="font-medium text-[#1F2E24]">
                        {user.favoriteGenre || 'Not set'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-[#F7F3E9] hover:bg-white transition">
                    <div className="w-10 h-10 flex-shrink-0 border border-[#3F6B4F] rounded-full flex items-center justify-center text-[#3F6B4F]">
                      <FaCalendarAlt className="text-sm" />
                    </div>
                    <div>
                      <p className="text-xs text-[#8A7F68] font-medium uppercase tracking-wide">
                        Joined
                      </p>
                      <p className="font-medium text-[#1F2E24] font-mono">
                        {user.joinDate || 'January 2024'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#B08D57]/20 border border-[#B08D57]/20">
                  <div className="text-center p-5 bg-[#132018]">
                    <p className="font-serif text-2xl font-bold text-[#D8C9A3]">
                      {user.totalBooksRead || 0}
                    </p>
                    <p className="text-xs text-white/50 uppercase tracking-wide mt-1">
                      Books Read
                    </p>
                  </div>
                  <div className="text-center p-5 bg-[#132018]">
                    <p className="font-serif text-2xl font-bold text-[#D8C9A3] flex items-center justify-center gap-1">
                      <FaStar className="text-base" /> 4.8
                    </p>
                    <p className="text-xs text-white/50 uppercase tracking-wide mt-1">
                      Avg Rating
                    </p>
                  </div>
                  <div className="text-center p-5 bg-[#132018]">
                    <p className="font-serif text-2xl font-bold text-[#D8C9A3]">
                      15
                    </p>
                    <p className="text-xs text-white/50 uppercase tracking-wide mt-1">
                      Genres Read
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
