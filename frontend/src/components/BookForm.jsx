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
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">
        {initialData ? '✏️ Edit Book' : '📚 Add New Book'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-emerald-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Author *</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-emerald-600"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Genre</label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
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
            <label className="block text-sm font-medium mb-1">Year</label>
            <input
              type="number"
              name="publishedYear"
              value={formData.publishedYear}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              placeholder="2024"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
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
              className="h-4 w-4 text-emerald-600"
            />
            <label className="ml-2 text-sm">Available</label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="2"
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700"
          >
            {initialData ? 'Update Book' : 'Add Book'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 py-2 rounded-lg hover:bg-gray-400"
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
