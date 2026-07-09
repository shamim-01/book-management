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
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = path => location.pathname === path;

  // ✅ Check if user is logged in on mount
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
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  }, [location]);

  // ✅ Logout Handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserName('');
    toast.success('Logged out successfully! 👋');
    navigate('/login');
  };

  // ✅ All Navigation Links
  const allNavLinks = [
    { path: '/', icon: FaHome, label: 'Home', public: true },
    { path: '/books', icon: FaBook, label: 'Books', public: false },
    { path: '/borrowed', icon: FaBookReader, label: 'Borrowed', public: false },
    { path: '/dashboard', icon: FaChartBar, label: 'Dashboard', public: false },
    { path: '/profile', icon: FaUser, label: 'Profile', public: false },
    { path: '/about', icon: FaInfoCircle, label: 'About', public: true },
  ];

  // ✅ Filter links based on login status
  const navLinks = allNavLinks.filter(link => link.public || isLoggedIn);

  return (
    <nav className="bg-gradient-to-r from-emerald-800 via-green-700 to-teal-800 text-white shadow-2xl sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Brand/Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300 group"
          >
            <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm group-hover:bg-white/30 transition">
              <FaBook className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white">
                Book Management
              </span>
              <span className="hidden sm:inline-block text-xs text-white/70 ml-2 font-light">
                v2.0
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map(link => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 relative
                    ${
                      active
                        ? 'bg-white/20 backdrop-blur-sm text-white shadow-lg scale-105'
                        : 'hover:bg-white/10 hover:scale-105 text-white/90'
                    }
                  `}
                >
                  <Icon
                    className={`text-sm ${active ? 'text-white' : 'text-white/80'}`}
                  />
                  <span className="text-sm font-medium text-white">
                    {link.label}
                  </span>
                  {active && (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-yellow-400 rounded-full"></span>
                  )}
                  {!link.public && !isLoggedIn && (
                    <FaLock className="text-xs text-white/40 ml-1" />
                  )}
                </Link>
              );
            })}

            {/* ✅ User Info & Login/Register/Logout */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-3 ml-4">
                <span className="text-sm text-white/80 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                  <span className="hidden xl:inline">{userName}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2.5 bg-rose-500/20 hover:bg-rose-500/40 border border-rose-400/30 rounded-xl transition-all duration-300 hover:scale-105 text-white"
                >
                  <FaSignOutAlt className="text-sm" />
                  <span className="text-sm font-medium hidden sm:inline">
                    Logout
                  </span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-4">
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all duration-300 hover:scale-105 text-white"
                >
                  <FaSignInAlt className="text-sm" />
                  <span className="text-sm font-medium">Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 rounded-xl transition-all duration-300 hover:scale-105 text-white shadow-md"
                >
                  <FaUserPlus className="text-sm" />
                  <span className="text-sm font-medium">Register</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button className="p-2.5 hover:bg-white/10 rounded-xl transition text-white">
              <FaSearch className="w-5 h-5" />
            </button>
            <button
              className="p-2.5 hover:bg-white/10 rounded-xl transition text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
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
              <div className="px-4 py-3 mb-2 bg-white/10 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <p className="font-medium text-white">{userName}</p>
                    <p className="text-xs text-white/60">Logged in</p>
                  </div>
                </div>
              </div>
            )}

            {navLinks.map(link => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300
                    ${
                      active
                        ? 'bg-white/20 backdrop-blur-sm text-white'
                        : 'hover:bg-white/10 text-white/90'
                    }
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="text-lg text-white" />
                  <span className="text-sm font-medium text-white">
                    {link.label}
                  </span>
                  {active && (
                    <span className="ml-auto w-2 h-2 bg-yellow-400 rounded-full"></span>
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
                className="flex items-center space-x-3 w-full px-4 py-3 mt-2 bg-rose-500/20 hover:bg-rose-500/30 rounded-xl transition-all duration-300 text-white"
              >
                <FaSignOutAlt className="text-lg" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-3 w-full px-4 py-3 hover:bg-white/10 rounded-xl transition-all duration-300 text-white/90"
                  onClick={() => setIsOpen(false)}
                >
                  <FaSignInAlt className="text-lg" />
                  <span className="text-sm font-medium">Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-3 w-full px-4 py-3 mt-1 bg-gradient-to-r from-emerald-500/20 to-green-500/20 hover:bg-white/10 rounded-xl transition-all duration-300 text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <FaUserPlus className="text-lg" />
                  <span className="text-sm font-medium">Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Line */}
      <div className="h-1 bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400"></div>
    </nav>
  );
};

export default Navbar;
