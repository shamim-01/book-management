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
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Header with Gradient */}
      <div className="h-1 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500"></div>

      <div className="p-5">
        {/* Main Search Bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FaSearch
                className={`transition-colors duration-300 ${isFocused ? 'text-emerald-500' : 'text-gray-400'}`}
              />
            </div>
            <input
              type="text"
              placeholder="🔍 Search books by title, author, or ISBN..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`
                w-full pl-12 pr-4 py-3.5 border-2 rounded-xl 
                transition-all duration-300 
                focus:outline-none focus:ring-4 focus:ring-indigo-500/20
                ${
                  isFocused
                    ? 'border-emerald-500 bg-emerald-50/50'
                    : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'
                }
              `}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                <FaTimes className="text-sm" />
              </button>
            )}
          </div>

          <button
            onClick={handleSearch}
            className="px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl 
                     hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 
                     font-medium shadow-md hover:shadow-lg flex items-center gap-2 whitespace-nowrap"
          >
            <FaSearch className="text-sm" />
            <span>Search</span>
          </button>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`
              px-4 py-3.5 rounded-xl transition-all duration-300 font-medium flex items-center gap-2
              ${
                showFilters
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            <FaFilter className="text-sm" />
            <span className="hidden sm:inline">Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            )}
          </button>

          <button
            onClick={handleClear}
            className="px-4 py-3.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 
                     transition-all duration-300 font-medium flex items-center gap-2"
          >
            <FaTimes className="text-sm" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mt-3 flex flex-wrap gap-2">
            {genre && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200">
                <FaBook className="text-xs" />
                {genre}
                <button
                  onClick={() => setGenre('')}
                  className="hover:text-indigo-900 transition"
                >
                  <FaTimes className="text-xs" />
                </button>
              </span>
            )}
            {(minPrice || maxPrice) && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 text-xs rounded-full border border-green-200">
                <FaDollarSign className="text-xs" />${minPrice || '0'} - $
                {maxPrice || '∞'}
                <button
                  onClick={() => {
                    setMinPrice('');
                    setMaxPrice('');
                  }}
                  className="hover:text-green-900 transition"
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
          <div className="p-5 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FaSlidersH className="text-emerald-500" />
                Advanced Filters
              </h3>
              <span className="text-xs text-gray-400">
                {hasActiveFilters ? '✅ Filters applied' : 'No filters applied'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Genre Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  <FaBook className="inline mr-1.5 text-emerald-500" />
                  Genre
                </label>
                <select
                  value={genre}
                  onChange={e => setGenre(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-lg px-3.5 py-2.5 
                           focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 
                           transition-all duration-300 bg-white hover:border-gray-300"
                >
                  <option value="">All Genres</option>
                  <option value="Fiction">📚 Fiction</option>
                  <option value="Non-Fiction">📖 Non-Fiction</option>
                  <option value="Science">🔬 Science</option>
                  <option value="History">🏛️ History</option>
                  <option value="Biography">👤 Biography</option>
                  <option value="Other">📌 Other</option>
                </select>
              </div>

              {/* Min Price Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  <FaDollarSign className="inline mr-1.5 text-green-500" />
                  Min Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="0"
                    value={minPrice}
                    onChange={e => setMinPrice(e.target.value)}
                    className="w-full pl-8 pr-3.5 py-2.5 border-2 border-gray-200 rounded-lg 
                             focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 
                             transition-all duration-300 bg-white hover:border-gray-300"
                    min="0"
                  />
                </div>
              </div>

              {/* Max Price Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  <FaDollarSign className="inline mr-1.5 text-red-500" />
                  Max Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="100"
                    value={maxPrice}
                    onChange={e => setMaxPrice(e.target.value)}
                    className="w-full pl-8 pr-3.5 py-2.5 border-2 border-gray-200 rounded-lg 
                             focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 
                             transition-all duration-300 bg-white hover:border-gray-300"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex gap-3 mt-5 pt-4 border-t border-gray-200">
              <button
                onClick={handleSearch}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white 
                         py-2.5 rounded-lg hover:from-emerald-700 hover:to-emerald-800 
                         transition-all duration-300 font-medium shadow-md hover:shadow-lg"
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
                className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg 
                         hover:bg-gray-300 transition-all duration-300 font-medium"
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
