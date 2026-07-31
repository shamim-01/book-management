// components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FaBars,
  FaTimes,
  FaBook,
  FaHome,
  FaChartBar,
  FaUser,
  FaSignOutAlt,
  FaInfoCircle,
  FaBookReader,
  FaSearch,
  FaSignInAlt,
  FaUserPlus,
  FaLock,
  FaHeart,
  FaHistory,
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [wishlistCount, setWishlistCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = path => location.pathname === path;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token) {
      setIsLoggedIn(true);
      if (user) {
        try {
          const userData = JSON.parse(user);
          setUserName(userData.name || 'User');
        } catch (e) {
          setUserName('User');
        }
      }
      fetchWishlistCount();
    } else {
      setIsLoggedIn(false);
      setUserName('');
      setWishlistCount(0);
    }
  }, [location]);

  const fetchWishlistCount = async () => {
    try {
      const { getWishlist } = await import('../services/api');
      const response = await getWishlist();
      setWishlistCount(response.data.wishlist?.length || 0);
    } catch (error) {
      console.error('❌ Error fetching wishlist count:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserName('');
    setWishlistCount(0);
    toast.success('Logged out successfully! 👋');
    navigate('/login');
  };

  const allNavLinks = [
    { path: '/', icon: FaHome, label: 'Home', public: true },
    { path: '/books', icon: FaBook, label: 'Books', public: false },
    { path: '/borrowed', icon: FaBookReader, label: 'Borrowed', public: false },
    { path: '/dashboard', icon: FaChartBar, label: 'Dashboard', public: false },
    {
      path: '/wishlist',
      icon: FaHeart,
      label: 'Wishlist',
      public: false,
      badge: true,
    },
    { path: '/history', icon: FaHistory, label: 'History', public: false },
    { path: '/profile', icon: FaUser, label: 'Profile', public: false },
    { path: '/about', icon: FaInfoCircle, label: 'About', public: true },
  ];

  const navLinks = allNavLinks.filter(link => link.public || isLoggedIn);

  return (
    <nav className="bg-[#132018] text-white shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Brand/Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 group flex-shrink-0"
          >
            <div className="w-10 h-10 lg:w-11 lg:h-11 border border-[#B08D57]/50 rounded-full flex items-center justify-center group-hover:bg-[#B08D57]/10 transition">
              <FaBook className="w-4 h-4 text-[#B08D57]" />
            </div>
            <span className="font-serif text-lg lg:text-xl font-bold tracking-tight text-white whitespace-nowrap">
              Book Manager
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map(link => {
              const Icon = link.icon;
              const active = isActive(link.path);
              const showBadge = link.badge && wishlistCount > 0;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    flex items-center space-x-2 px-3 py-2 rounded-sm transition-all duration-300 relative
                    ${active ? 'text-white bg-white/5' : 'hover:bg-white/5 text-white/70'}
                  `}
                >
                  <Icon
                    className={`text-sm ${active ? 'text-[#B08D57]' : 'text-white/50'}`}
                  />
                  <span className="text-sm font-medium tracking-wide">
                    {link.label}
                  </span>
                  {showBadge && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                      {wishlistCount}
                    </span>
                  )}
                  {active && (
                    <span className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-[#B08D57] rounded-full"></span>
                  )}
                </Link>
              );
            })}

            {/* User Info & Login/Register/Logout */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-white/10">
                <span className="text-sm text-white/70 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-[#B08D57]/20 border border-[#B08D57]/50 flex items-center justify-center text-sm font-medium text-[#B08D57]">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                  <span className="hidden xl:inline text-sm font-medium">
                    {userName}
                  </span>
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 border border-[#8A4A3A]/40 hover:bg-[#8A4A3A]/20 rounded-sm transition-all duration-300 text-white/80 hover:text-white text-sm"
                >
                  <FaSignOutAlt className="text-sm" />
                  <span className="text-sm font-medium hidden sm:inline">
                    Logout
                  </span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-white/10">
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-3 py-2 border border-white/20 hover:bg-white/10 rounded-sm transition-all duration-300 text-white/80 hover:text-white text-sm"
                >
                  <FaSignInAlt className="text-sm" />
                  <span className="text-sm font-medium">Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-2 px-4 py-2 bg-[#B08D57] hover:bg-[#C7A56C] rounded-sm transition-all duration-300 text-[#132018] font-semibold text-sm"
                >
                  <FaUserPlus className="text-sm" />
                  <span className="text-sm">Register</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              className="p-2 hover:bg-white/10 rounded-sm transition text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <FaTimes className="w-5 h-5" />
              ) : (
                <FaBars className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
            lg:hidden overflow-hidden transition-all duration-500 ease-in-out
            ${isOpen ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="py-4 space-y-1 border-t border-white/10">
            {/* Mobile User Info */}
            {isLoggedIn && (
              <div className="px-4 py-3 mb-2 border border-white/10 rounded-sm bg-white/5">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-[#B08D57]/20 border border-[#B08D57]/50 flex items-center justify-center text-lg font-medium text-[#B08D57]">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <p className="font-medium text-white">{userName}</p>
                    <p className="text-xs text-white/50">Logged in</p>
                  </div>
                </div>
              </div>
            )}

            {navLinks.map(link => {
              const Icon = link.icon;
              const active = isActive(link.path);
              const showBadge = link.badge && wishlistCount > 0;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-sm transition-all duration-300
                    ${
                      active
                        ? 'bg-white/10 text-white'
                        : 'hover:bg-white/5 text-white/70'
                    }
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon
                    className={`text-lg ${active ? 'text-[#B08D57]' : 'text-white/50'}`}
                  />
                  <span className="text-sm font-medium">{link.label}</span>
                  {showBadge && (
                    <span className="ml-auto bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {wishlistCount}
                    </span>
                  )}
                  {active && (
                    <span className="ml-auto w-1.5 h-1.5 bg-[#B08D57] rounded-full"></span>
                  )}
                </Link>
              );
            })}

            {/* Mobile Login/Register/Logout */}
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="flex items-center space-x-3 w-full px-4 py-3 mt-2 border border-[#8A4A3A]/40 hover:bg-[#8A4A3A]/15 rounded-sm transition-all duration-300 text-white"
              >
                <FaSignOutAlt className="text-lg" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-3 w-full px-4 py-3 hover:bg-white/5 rounded-sm transition-all duration-300 text-white/80"
                  onClick={() => setIsOpen(false)}
                >
                  <FaSignInAlt className="text-lg" />
                  <span className="text-sm font-medium">Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-3 w-full px-4 py-3 mt-1 bg-[#B08D57] hover:bg-[#C7A56C] rounded-sm transition-all duration-300 text-[#132018] font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  <FaUserPlus className="text-lg" />
                  <span className="text-sm">Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Line */}
      <div className="h-[2px] bg-gradient-to-r from-[#B08D57] via-[#3F6B4F] to-[#B08D57]"></div>
    </nav>
  );
};

export default Navbar;
