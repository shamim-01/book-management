import React, { useState } from 'react';
import toast from 'react-hot-toast';

const BorrowModal = ({ book, onClose, onBorrow }) => {
  const [formData, setFormData] = useState({
    borrowerName: '',
    borrowerEmail: '',
    dueDate: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    console.log('📝 Form submitted with data:', formData);

    // Validation
    if (!formData.borrowerName.trim()) {
      toast.error('Please enter borrower name');
      return;
    }
    if (!formData.borrowerEmail.trim()) {
      toast.error('Please enter borrower email');
      return;
    }

    setLoading(true);
    try {
      const borrowData = {
        bookId: book._id,
        borrowerName: formData.borrowerName.trim(),
        borrowerEmail: formData.borrowerEmail.trim(),
        dueDate: formData.dueDate || '',
        notes: formData.notes || '',
      };

      console.log('📖 Sending borrow request:', borrowData);

      await onBorrow(borrowData);
      toast.success(`✅ "${book.title}" borrowed successfully!`);
      onClose();
    } catch (error) {
      console.error('❌ Borrow error:', error);
      toast.error(error.response?.data?.message || 'Failed to borrow book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">📖 Borrow Book</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="font-semibold">{book.title}</p>
          <p className="text-sm text-gray-600">by {book.author}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Borrower Name *
            </label>
            <input
              type="text"
              name="borrowerName"
              value={formData.borrowerName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              placeholder="Enter borrower name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Borrower Email *
            </label>
            <input
              type="email"
              name="borrowerEmail"
              value={formData.borrowerEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              placeholder="Enter borrower email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date (Optional)
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (Optional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              placeholder="Any special notes..."
            />
          </div>

          <div className="flex space-x-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition font-medium disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Confirm Borrow'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BorrowModal;
