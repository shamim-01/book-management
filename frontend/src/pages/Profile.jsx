import React, { useState } from 'react';
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
  FaChartBar,
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (234) 567-8900',
    bio: '📚 Book lover and full-stack developer. Passionate about reading and building amazing applications.',
    joinDate: 'January 2024',
    favoriteGenre: 'Fiction',
    totalBooksRead: 42,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setUser(formData);
    setIsEditing(false);
    toast.success('✅ Profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f0eb]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ===== HEADER ===== */}
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-900 to-slate-900 rounded-2xl shadow-2xl mb-8">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400 rounded-full blur-3xl"></div>
          </div>

          <div className="relative px-6 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-4xl sm:text-5xl">👤</span>
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                      Profile
                    </h1>
                    <p className="text-emerald-200 text-sm sm:text-base mt-0.5">
                      Manage your personal information
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 
                         text-white px-5 sm:px-6 py-2.5 rounded-xl transition-all duration-300 
                         font-medium border border-white/20 hover:scale-105 text-sm sm:text-base"
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
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden max-w-4xl mx-auto border border-gray-100/80">
          {/* Cover Image - Simple Gradient */}
          <div className="h-28 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 relative">
            <div className="absolute -bottom-10 left-8">
              <div className="w-20 h-20 rounded-full bg-white p-1 shadow-xl">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                  <FaUserCircle className="text-4xl text-emerald-700" />
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-12 px-8 pb-8">
            {isEditing ? (
              // ===== EDIT FORM =====
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                      <FaUser className="text-emerald-600 text-xs" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                      <FaEnvelope className="text-emerald-600 text-xs" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                      <FaPhone className="text-emerald-600 text-xs" />
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                      <FaHeart className="text-emerald-600 text-xs" />
                      Favorite Genre
                    </label>
                    <input
                      type="text"
                      name="favoriteGenre"
                      value={formData.favoriteGenre}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                    <FaBook className="text-emerald-600 text-xs" />
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-700 to-emerald-800 
                             text-white py-3 rounded-xl hover:from-emerald-800 hover:to-emerald-900 
                             transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                  >
                    <FaSave className="text-sm" />
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-200 
                             text-gray-700 py-3 rounded-xl hover:bg-gray-300 
                             transition-all duration-300 font-medium"
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
                  <h2 className="text-2xl font-bold text-gray-800">
                    {user.name}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">{user.bio}</p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-emerald-50 transition border border-gray-100/80">
                    <div className="bg-emerald-100 p-3 rounded-lg">
                      <FaEnvelope className="text-emerald-700" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Email</p>
                      <p className="font-medium text-gray-800">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-teal-50 transition border border-gray-100/80">
                    <div className="bg-teal-100 p-3 rounded-lg">
                      <FaPhone className="text-teal-700" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Phone</p>
                      <p className="font-medium text-gray-800">{user.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-amber-50 transition border border-gray-100/80">
                    <div className="bg-amber-100 p-3 rounded-lg">
                      <FaHeart className="text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Favorite Genre
                      </p>
                      <p className="font-medium text-gray-800">
                        {user.favoriteGenre}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-emerald-50 transition border border-gray-100/80">
                    <div className="bg-emerald-100 p-3 rounded-lg">
                      <FaCalendarAlt className="text-emerald-700" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Joined
                      </p>
                      <p className="font-medium text-gray-800">
                        {user.joinDate}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl border border-emerald-100">
                    <p className="text-2xl font-bold text-emerald-700">
                      {user.totalBooksRead}
                    </p>
                    <p className="text-xs text-gray-500 font-medium">
                      Books Read
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-xl border border-teal-100">
                    <p className="text-2xl font-bold text-teal-700">★ 4.8</p>
                    <p className="text-xs text-gray-500 font-medium">
                      Avg Rating
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl border border-amber-100">
                    <p className="text-2xl font-bold text-amber-600">📚 15</p>
                    <p className="text-xs text-gray-500 font-medium">
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
