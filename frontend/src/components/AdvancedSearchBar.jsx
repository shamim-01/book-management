import React, { useState } from 'react';
import {
  FaSearch,
  FaFilter,
  FaTimes,
  FaSlidersH,
  FaBook,
  FaDollarSign,
  FaCalendarAlt,
} from 'react-icons/fa';

const AdvancedSearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = () => {
    onSearch({
      q: query,
      genre,
      minPrice,
      maxPrice,
    });
  };

  const handleClear = () => {
    setQuery('');
    setGenre('');
    setMinPrice('');
    setMaxPrice('');
    onSearch({ q: '', genre: '', minPrice: '', maxPrice: '' });
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const hasActiveFilters = genre || minPrice || maxPrice;

  return (
    <div className="bg-white/70 rounded-sm border border-[#B08D57]/25 overflow-hidden">
      {/* Header rule */}
      <div className="h-[3px] bg-[#B08D57]"></div>

      <div className="p-5">
        {/* Main Search Bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <FaSearch
                className={`transition-colors duration-300 ${isFocused ? 'text-[#3F6B4F]' : 'text-[#8A7F68]'}`}
              />
            </div>
            <input
              type="text"
              placeholder="Search books by title, author, or ISBN…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`
                w-full pl-12 pr-10 py-3.5 border rounded-sm bg-[#F7F3E9]
                transition-all duration-300 text-[#2A2A24] placeholder:text-[#A69B85]
                focus:outline-none
                ${
                  isFocused
                    ? 'border-[#3F6B4F]'
                    : 'border-[#B08D57]/30 hover:border-[#B08D57]/50'
                }
              `}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#8A7F68] hover:text-[#2A2A24] transition"
              >
                <FaTimes className="text-sm" />
              </button>
            )}
          </div>

          <button
            onClick={handleSearch}
            className="px-6 py-3.5 bg-[#3F6B4F] text-white rounded-sm
                     hover:bg-[#345A42] transition-all duration-300
                     text-sm font-medium uppercase tracking-wide flex items-center gap-2 whitespace-nowrap"
          >
            <FaSearch className="text-sm" />
            <span>Search</span>
          </button>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`
              relative px-4 py-3.5 rounded-sm transition-all duration-300 text-sm font-medium uppercase tracking-wide flex items-center gap-2 border
              ${
                showFilters
                  ? 'bg-[#132018] text-white border-[#132018]'
                  : 'bg-transparent text-[#2A2A24] border-[#B08D57]/30 hover:border-[#B08D57]/60'
              }
            `}
          >
            <FaFilter className="text-sm" />
            <span className="hidden sm:inline">Filters</span>
            {hasActiveFilters && (
              <span className="w-1.5 h-1.5 bg-[#B08D57] rounded-full absolute -top-1 -right-1"></span>
            )}
          </button>

          <button
            onClick={handleClear}
            className="px-4 py-3.5 border border-[#8A4A3A]/40 text-[#8A4A3A] rounded-sm hover:bg-[#8A4A3A]/10
                     transition-all duration-300 text-sm font-medium uppercase tracking-wide flex items-center gap-2"
          >
            <FaTimes className="text-sm" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mt-3 flex flex-wrap gap-2">
            {genre && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#3F6B4F]/10 text-[#3F6B4F] text-xs rounded-full border border-[#3F6B4F]/25">
                <FaBook className="text-xs" />
                {genre}
                <button
                  onClick={() => setGenre('')}
                  className="hover:text-[#1F2E24] transition"
                >
                  <FaTimes className="text-xs" />
                </button>
              </span>
            )}
            {(minPrice || maxPrice) && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#B08D57]/10 text-[#8A6A2E] text-xs rounded-full border border-[#B08D57]/30 font-mono">
                <FaDollarSign className="text-xs" />${minPrice || '0'} - $
                {maxPrice || '∞'}
                <button
                  onClick={() => {
                    setMinPrice('');
                    setMaxPrice('');
                  }}
                  className="hover:text-[#1F2E24] transition"
                >
                  <FaTimes className="text-xs" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Advanced Filters */}
        <div
          className={`
            overflow-hidden transition-all duration-500 ease-in-out
            ${showFilters ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="p-5 bg-[#F7F3E9] rounded-sm border border-[#B08D57]/25">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold text-[#2A2A24] uppercase tracking-[0.2em] flex items-center gap-2">
                <FaSlidersH className="text-[#B08D57]" />
                Advanced Filters
              </h3>
              <span className="text-xs text-[#8A7F68] font-mono">
                {hasActiveFilters ? 'Filters applied' : 'No filters applied'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Genre Filter */}
              <div>
                <label className="block text-xs font-medium text-[#6B6354] uppercase tracking-wide mb-1.5">
                  <FaBook className="inline mr-1.5 text-[#3F6B4F]" />
                  Genre
                </label>
                <select
                  value={genre}
                  onChange={e => setGenre(e.target.value)}
                  className="w-full border border-[#B08D57]/30 rounded-sm px-3.5 py-2.5
                           focus:outline-none focus:border-[#3F6B4F]
                           transition-all duration-300 bg-white text-[#2A2A24] hover:border-[#B08D57]/50"
                >
                  <option value="">All Genres</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Non-Fiction">Non-Fiction</option>
                  <option value="Science">Science</option>
                  <option value="History">History</option>
                  <option value="Biography">Biography</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Min Price Filter */}
              <div>
                <label className="block text-xs font-medium text-[#6B6354] uppercase tracking-wide mb-1.5">
                  <FaDollarSign className="inline mr-1.5 text-[#3F6B4F]" />
                  Min Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8A7F68]">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="0"
                    value={minPrice}
                    onChange={e => setMinPrice(e.target.value)}
                    className="w-full pl-8 pr-3.5 py-2.5 border border-[#B08D57]/30 rounded-sm
                             focus:outline-none focus:border-[#3F6B4F]
                             transition-all duration-300 bg-white text-[#2A2A24] hover:border-[#B08D57]/50"
                    min="0"
                  />
                </div>
              </div>

              {/* Max Price Filter */}
              <div>
                <label className="block text-xs font-medium text-[#6B6354] uppercase tracking-wide mb-1.5">
                  <FaDollarSign className="inline mr-1.5 text-[#8A4A3A]" />
                  Max Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8A7F68]">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="100"
                    value={maxPrice}
                    onChange={e => setMaxPrice(e.target.value)}
                    className="w-full pl-8 pr-3.5 py-2.5 border border-[#B08D57]/30 rounded-sm
                             focus:outline-none focus:border-[#3F6B4F]
                             transition-all duration-300 bg-white text-[#2A2A24] hover:border-[#B08D57]/50"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex gap-3 mt-5 pt-4 border-t border-[#B08D57]/20">
              <button
                onClick={handleSearch}
                className="flex-1 bg-[#3F6B4F] text-white
                         py-2.5 rounded-sm hover:bg-[#345A42]
                         transition-all duration-300 text-sm font-medium uppercase tracking-wide"
              >
                <FaSearch className="inline mr-2" />
                Apply Filters
              </button>
              <button
                onClick={() => {
                  setGenre('');
                  setMinPrice('');
                  setMaxPrice('');
                }}
                className="px-6 py-2.5 border border-[#B08D57]/40 text-[#6B6354] rounded-sm
                         hover:bg-[#B08D57]/10 transition-all duration-300 text-sm font-medium uppercase tracking-wide"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchBar;
