import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const BookForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: 'Other',
    publishedYear: '',
    price: '',
    description: '',
    isAvailable: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    console.log('📝 1. Form Data:', formData);

    if (!formData.title?.trim()) {
      toast.error('Please enter book title');
      return;
    }
    if (!formData.author?.trim()) {
      toast.error('Please enter author name');
      return;
    }

    const bookData = {
      title: formData.title.trim(),
      author: formData.author.trim(),
      genre: formData.genre || 'Other',
      publishedYear: formData.publishedYear
        ? parseInt(formData.publishedYear)
        : undefined,
      price: formData.price ? parseFloat(formData.price) : 0,
      description: formData.description?.trim() || '',
      isAvailable: formData.isAvailable,
    };

    console.log('📤 2. Sending to API:', bookData);

    try {
      await onSubmit(bookData);
      console.log('✅ 3. Submit successful');
    } catch (error) {
      console.error('❌ 4. Submit error:', error);
      toast.error('Failed to submit form');
    }
  };

  return (
    <div className="bg-white border border-[#B08D57]/25 rounded-sm shadow-lg p-6">
      <h2 className="font-serif text-2xl font-bold text-[#1F2E24] mb-6 border-b border-[#B08D57]/30 pb-4">
        {initialData ? 'Edit Book' : 'Add New Book'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#5B5347] uppercase tracking-wide mb-1.5">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-[#B08D57]/30 rounded-sm p-2.5 bg-[#F7F3E9]/40
                       focus:ring-2 focus:ring-[#3F6B4F]/20 focus:border-[#3F6B4F] outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#5B5347] uppercase tracking-wide mb-1.5">
              Author *
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full border border-[#B08D57]/30 rounded-sm p-2.5 bg-[#F7F3E9]/40
                       focus:ring-2 focus:ring-[#3F6B4F]/20 focus:border-[#3F6B4F] outline-none transition"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#5B5347] uppercase tracking-wide mb-1.5">
              Genre
            </label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full border border-[#B08D57]/30 rounded-sm p-2.5 bg-[#F7F3E9]/40
                       focus:ring-2 focus:ring-[#3F6B4F]/20 focus:border-[#3F6B4F] outline-none transition"
            >
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
              <option value="Biography">Biography</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#5B5347] uppercase tracking-wide mb-1.5">
              Year
            </label>
            <input
              type="number"
              name="publishedYear"
              value={formData.publishedYear}
              onChange={handleChange}
              className="w-full border border-[#B08D57]/30 rounded-sm p-2.5 bg-[#F7F3E9]/40
                       focus:ring-2 focus:ring-[#3F6B4F]/20 focus:border-[#3F6B4F] outline-none transition"
              placeholder="2024"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#5B5347] uppercase tracking-wide mb-1.5">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-[#B08D57]/30 rounded-sm p-2.5 bg-[#F7F3E9]/40
                       focus:ring-2 focus:ring-[#3F6B4F]/20 focus:border-[#3F6B4F] outline-none transition"
              placeholder="0.00"
              step="0.01"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
              className="h-4 w-4 accent-[#3F6B4F]"
            />
            <label className="ml-2 text-sm text-[#5B5347]">Available</label>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#5B5347] uppercase tracking-wide mb-1.5">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="2"
            className="w-full border border-[#B08D57]/30 rounded-sm p-2.5 bg-[#F7F3E9]/40
                     focus:ring-2 focus:ring-[#3F6B4F]/20 focus:border-[#3F6B4F] outline-none transition"
          />
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="flex-1 bg-[#B08D57] text-[#132018] py-2.5 rounded-sm font-semibold
                     tracking-wide hover:bg-[#C7A56C] transition"
          >
            {initialData ? 'Update Book' : 'Add Book'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-transparent border border-[#B08D57]/40 text-[#5B5347] py-2.5
                       rounded-sm font-semibold tracking-wide hover:bg-[#B08D57]/10 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookForm;
