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
    { icon: FaReact, name: 'React.js' },
    { icon: SiJavascript, name: 'JavaScript' },
    { icon: SiTailwindcss, name: 'Tailwind CSS' },
    { icon: FaNodeJs, name: 'Node.js' },
    { icon: SiExpress, name: 'Express.js' },
    { icon: SiMongodb, name: 'MongoDB' },
  ];

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
                  About the Catalog
                </span>
                <div className="flex items-center gap-3 mt-2">
                  <div className="w-11 h-11 border border-[#B08D57]/50 rounded-full flex items-center justify-center text-[#B08D57] flex-shrink-0">
                    <FaBook />
                  </div>
                  <div>
                    <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                      About
                    </h1>
                    <p className="text-white/50 text-sm sm:text-base mt-0.5">
                      Learn more about this project
                    </p>
                  </div>
                </div>
              </div>

              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-[#B08D57] hover:bg-[#C7A56C]
                         text-[#132018] px-5 sm:px-6 py-2.5 rounded-sm transition-all duration-300
                         font-semibold tracking-wide text-sm sm:text-base"
              >
                <FaRocket className="text-sm" />
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* ===== ABOUT CONTENT ===== */}
        <div className="bg-white/60 border border-[#B08D57]/25 rounded-sm overflow-hidden">
          {/* Hero Section */}
          <div className="p-8 sm:p-10 border-b border-[#B08D57]/20">
            <div className="text-center max-w-2xl mx-auto">
              <div className="w-14 h-14 mx-auto border border-[#3F6B4F] rounded-full flex items-center justify-center text-2xl text-[#3F6B4F] mb-5">
                <FaBook />
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#1F2E24] mb-3">
                Welcome to Book Management System
              </h2>
              <p className="text-[#6B6354] text-lg leading-relaxed">
                A comprehensive solution for managing your personal or library
                book collection. Built with modern technologies to provide the
                best user experience.
              </p>
            </div>
          </div>

          {/* Features Section */}
          <div className="p-8 sm:p-10 border-b border-[#B08D57]/20">
            <div className="flex items-center gap-3 mb-7">
              <span className="text-[#3F6B4F] text-xs font-semibold uppercase tracking-[0.25em]">
                Features
              </span>
              <div className="flex-1 h-px bg-[#B08D57]/25"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#B08D57]/25 border border-[#B08D57]/25">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="group bg-[#F7F3E9] p-6 hover:bg-white transition-colors duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 flex-shrink-0 border border-[#3F6B4F] rounded-full flex items-center justify-center text-[#3F6B4F] group-hover:bg-[#3F6B4F] group-hover:text-[#F7F3E9] transition-colors duration-300">
                        <Icon className="text-lg" />
                      </div>
                      <div>
                        <h3 className="font-serif font-semibold text-[#1F2E24] mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-[#6B6354] leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Technologies Section */}
          <div className="p-8 sm:p-10 border-b border-[#B08D57]/20">
            <div className="flex items-center gap-3 mb-7">
              <span className="text-[#3F6B4F] text-xs font-semibold uppercase tracking-[0.25em]">
                Built With
              </span>
              <div className="flex-1 h-px bg-[#B08D57]/25"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-px bg-[#B08D57]/20 border border-[#B08D57]/20">
              {techs.map((tech, index) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center gap-2 p-5 bg-[#F7F3E9] hover:bg-white transition-colors duration-300"
                  >
                    <Icon className="text-2xl sm:text-3xl text-[#3F6B4F]" />
                    <span className="text-[11px] font-medium text-[#6B6354] text-center uppercase tracking-wide">
                      {tech.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Version & Info Section */}
          <div className="p-8 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#B08D57]/20 border border-[#B08D57]/20">
              <div className="text-center p-6 bg-[#F7F3E9]">
                <p className="font-mono text-[10px] text-[#B08D57] tracking-widest mb-2">
                  NO.01
                </p>
                <p className="text-xs font-medium text-[#8A7F68] uppercase tracking-wide">
                  Version
                </p>
                <p className="font-serif text-xl font-bold text-[#3F6B4F] mt-1">
                  2.0.0
                </p>
              </div>
              <div className="text-center p-6 bg-[#F7F3E9]">
                <p className="font-mono text-[10px] text-[#B08D57] tracking-widest mb-2">
                  NO.02
                </p>
                <p className="text-xs font-medium text-[#8A7F68] uppercase tracking-wide">
                  Released
                </p>
                <p className="font-serif text-xl font-bold text-[#3F6B4F] mt-1">
                  July 2026
                </p>
              </div>
              <div className="text-center p-6 bg-[#F7F3E9]">
                <p className="font-mono text-[10px] text-[#B08D57] tracking-widest mb-2">
                  NO.03
                </p>
                <p className="text-xs font-medium text-[#8A7F68] uppercase tracking-wide">
                  Made With
                </p>
                <p className="font-serif text-xl font-bold text-[#3F6B4F] mt-1">
                  Passion &amp; Code
                </p>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-8 text-center">
              <p className="text-sm text-[#8A7F68]">
                Built with care using React.js, Node.js, Express.js &amp;
                MongoDB
              </p>
              <div className="flex items-center justify-center gap-4 mt-3">
                <span className="text-xs text-[#A69B85]">
                  © 2026 BookManager
                </span>
                <span className="text-xs text-[#B08D57]">•</span>
                <span className="text-xs text-[#A69B85]">
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
