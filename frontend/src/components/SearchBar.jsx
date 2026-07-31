import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = e => {
    e.preventDefault();
    console.log('🔍 Searching for:', query); // ✅ Debug
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    console.log('🧹 Clearing search'); // ✅ Debug
    onSearch('');
  };

  return (
    <div className="bg-white/70 p-4 rounded-sm border border-[#B08D57]/25">
      <form onSubmit={handleSearch} className="flex items-center space-x-2">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search books by title or author…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full px-4 py-2.5 pl-10 border border-[#B08D57]/30 rounded-sm bg-[#F7F3E9] text-[#2A2A24] placeholder:text-[#A69B85] focus:outline-none focus:border-[#3F6B4F] transition"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A7F68]"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <button
          type="submit"
          className="bg-[#3F6B4F] text-white px-6 py-2.5 rounded-sm hover:bg-[#345A42] transition text-sm font-medium uppercase tracking-wide"
        >
          Search
        </button>
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="border border-[#B08D57]/40 text-[#6B6354] px-4 py-2.5 rounded-sm hover:bg-[#B08D57]/10 transition text-sm font-medium uppercase tracking-wide"
          >
            Clear
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
