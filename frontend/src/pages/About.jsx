import React from 'react';
import {
  FaBook,
  FaSearch,
  FaExchangeAlt,
  FaChartBar,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaCss3Alt,
  FaGithub,
  FaRocket,
  FaShieldAlt,
  FaUsers,
  FaStar,
  FaCode,
  FaServer,
  FaCloudUploadAlt,
  FaMobileAlt,
} from 'react-icons/fa';
import {
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiJavascript,
} from 'react-icons/si';
import { Link } from 'react-router-dom';

const About = () => {
  const features = [
    {
      icon: FaBook,
      title: 'Book Management',
      desc: 'Add, edit, and organize your entire book collection with ease.',
    },
    {
      icon: FaSearch,
      title: 'Search & Filter',
      desc: 'Find books quickly with advanced search and filter options.',
    },
    {
      icon: FaExchangeAlt,
      title: 'Borrow & Return',
      desc: 'Simple borrow and return system with due date tracking.',
    },
    {
      icon: FaChartBar,
      title: 'Analytics Dashboard',
      desc: 'Get insights with beautiful charts and statistics.',
    },
  ];

  const techs = [
    {
      icon: FaReact,
      name: 'React.js',
      color: 'text-blue-400',
      bg: 'bg-blue-50',
    },
    {
      icon: SiJavascript,
      name: 'JavaScript',
      color: 'text-yellow-500',
      bg: 'bg-yellow-50',
    },
    {
      icon: SiTailwindcss,
      name: 'Tailwind CSS',
      color: 'text-cyan-500',
      bg: 'bg-cyan-50',
    },
    {
      icon: FaNodeJs,
      name: 'Node.js',
      color: 'text-green-500',
      bg: 'bg-green-50',
    },
    {
      icon: SiExpress,
      name: 'Express.js',
      color: 'text-gray-600',
      bg: 'bg-gray-50',
    },
    {
      icon: SiMongodb,
      name: 'MongoDB',
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
  ];

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
                  <span className="text-4xl sm:text-5xl">📚</span>
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                      About
                    </h1>
                    <p className="text-emerald-200 text-sm sm:text-base mt-0.5">
                      Learn more about this project
                    </p>
                  </div>
                </div>
              </div>

              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 
                         text-white px-5 sm:px-6 py-2.5 rounded-xl transition-all duration-300 
                         font-medium border border-white/20 hover:scale-105 text-sm sm:text-base"
              >
                <FaRocket className="text-sm" />
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* ===== ABOUT CONTENT ===== */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100/80">
          {/* Hero Section */}
          <div className="p-8 sm:p-10 border-b border-gray-100">
            <div className="text-center max-w-3xl mx-auto">
              <div className="text-6xl mb-4">📖</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Welcome to Book Management System
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                A comprehensive solution for managing your personal or library
                book collection. Built with modern technologies to provide the
                best user experience.
              </p>
            </div>
          </div>

          {/* Features Section */}
          <div className="p-8 sm:p-10 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🎯</span>
              <h2 className="text-2xl font-bold text-gray-800">Features</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const colors = [
                  'border-emerald-200 bg-emerald-50/50',
                  'border-teal-200 bg-teal-50/50',
                  'border-amber-200 bg-amber-50/50',
                  'border-green-200 bg-green-50/50',
                ];
                const iconColors = [
                  'text-emerald-700 bg-emerald-100',
                  'text-teal-700 bg-teal-100',
                  'text-amber-600 bg-amber-100',
                  'text-green-700 bg-green-100',
                ];
                const colorClass = colors[index % colors.length];
                const iconColor = iconColors[index % iconColors.length];

                return (
                  <div
                    key={index}
                    className={`group border rounded-xl p-5 hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${colorClass}`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-xl ${iconColor} group-hover:scale-110 transition`}
                      >
                        <Icon className="text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-500">{feature.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Technologies Section */}
          <div className="p-8 sm:p-10 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🛠️</span>
              <h2 className="text-2xl font-bold text-gray-800">
                Technologies Used
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {techs.map((tech, index) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={index}
                    className={`flex flex-col items-center justify-center p-5 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${tech.bg}`}
                  >
                    <Icon
                      className={`text-3xl sm:text-4xl ${tech.color} mb-2`}
                    />
                    <span className="text-xs font-medium text-gray-600 text-center">
                      {tech.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Version & Info Section */}
          <div className="p-8 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-5 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl border border-emerald-100">
                <div className="text-3xl mb-2">📊</div>
                <p className="text-sm font-medium text-gray-500">Version</p>
                <p className="text-lg font-bold text-emerald-700">2.0.0</p>
              </div>
              <div className="text-center p-5 bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-xl border border-teal-100">
                <div className="text-3xl mb-2">📅</div>
                <p className="text-sm font-medium text-gray-500">Released</p>
                <p className="text-lg font-bold text-teal-700">July 2026</p>
              </div>
              <div className="text-center p-5 bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl border border-amber-100">
                <div className="text-3xl mb-2">❤️</div>
                <p className="text-sm font-medium text-gray-500">Made With</p>
                <p className="text-lg font-bold text-amber-600">
                  Passion & Code
                </p>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Built with ❤️ using React.js, Node.js, Express.js & MongoDB
              </p>
              <div className="flex items-center justify-center gap-4 mt-3">
                <span className="text-xs text-gray-400">
                  © 2026 BookManager
                </span>
                <span className="text-xs text-gray-300">•</span>
                <span className="text-xs text-gray-400">
                  All rights reserved
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
