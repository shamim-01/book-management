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
  FaStar,
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
    <div className="min-h-screen bg-[#F7F3E9] font-sans text-[#2A2A24]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* ===== HEADER ===== */}
        <div className="relative overflow-hidden bg-[#132018] rounded-sm shadow-xl mb-10">
          {/* Book-spine texture bars */}
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
                className="inline-flex items-center gap-2 bg-[#B08D57] hover:bg-[#C7A56C]
                         text-[#132018] px-5 sm:px-6 py-2.5 rounded-sm transition-all duration-300
                         font-semibold tracking-wide text-sm sm:text-base"
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
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-[#6B6354] uppercase tracking-wide mb-1.5 flex items-center gap-2">
                      <FaUser className="text-[#3F6B4F] text-xs" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
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
                      value={formData.email}
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
                      value={formData.phone}
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
                      value={formData.favoriteGenre}
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
                    value={formData.bio}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2.5 border border-[#B08D57]/30 rounded-sm bg-white focus:outline-none focus:border-[#3F6B4F] transition"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#3F6B4F]
                             text-white py-3 rounded-sm hover:bg-[#345A42]
                             transition-all duration-300 text-sm font-medium uppercase tracking-wide"
                  >
                    <FaSave className="text-sm" />
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 inline-flex items-center justify-center gap-2 border border-[#B08D57]/40
                             text-[#6B6354] py-3 rounded-sm hover:bg-[#B08D57]/10
                             transition-all duration-300 text-sm font-medium uppercase tracking-wide"
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
                    {user.name}
                  </h2>
                  <p className="text-[#6B6354] text-sm mt-1">{user.bio}</p>
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
                      <p className="font-medium text-[#1F2E24]">{user.phone}</p>
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
                        {user.favoriteGenre}
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
                        {user.joinDate}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#B08D57]/20 border border-[#B08D57]/20">
                  <div className="text-center p-5 bg-[#132018]">
                    <p className="font-serif text-2xl font-bold text-[#D8C9A3]">
                      {user.totalBooksRead}
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
