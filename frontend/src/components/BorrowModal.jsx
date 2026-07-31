import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaBookOpen, FaTimes } from 'react-icons/fa';

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
    <div className="fixed inset-0 bg-[#132018]/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#F7F3E9] rounded-sm max-w-md w-full p-6 max-h-[90vh] overflow-y-auto border border-[#B08D57]/30 shadow-2xl">
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-serif text-2xl font-bold text-[#1F2E24] flex items-center gap-2.5">
            <span className="w-9 h-9 border border-[#3F6B4F] rounded-full flex items-center justify-center text-[#3F6B4F] text-sm">
              <FaBookOpen />
            </span>
            Borrow Book
          </h2>
          <button
            onClick={onClose}
            className="text-[#8A7F68] hover:text-[#2A2A24] transition text-lg"
          >
            <FaTimes />
          </button>
        </div>

        <div className="mb-5 p-3.5 bg-white/70 border border-[#B08D57]/25 rounded-sm">
          <p className="font-serif font-semibold text-[#1F2E24]">
            {book.title}
          </p>
          <p className="text-sm text-[#6B6354]">by {book.author}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#6B6354] uppercase tracking-wide mb-1.5">
              Borrower Name *
            </label>
            <input
              type="text"
              name="borrowerName"
              value={formData.borrowerName}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 border border-[#B08D57]/30 rounded-sm bg-white text-[#2A2A24] focus:outline-none focus:border-[#3F6B4F] transition"
              placeholder="Enter borrower name"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#6B6354] uppercase tracking-wide mb-1.5">
              Borrower Email *
            </label>
            <input
              type="email"
              name="borrowerEmail"
              value={formData.borrowerEmail}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 border border-[#B08D57]/30 rounded-sm bg-white text-[#2A2A24] focus:outline-none focus:border-[#3F6B4F] transition"
              placeholder="Enter borrower email"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#6B6354] uppercase tracking-wide mb-1.5">
              Due Date (Optional)
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 border border-[#B08D57]/30 rounded-sm bg-white text-[#2A2A24] focus:outline-none focus:border-[#3F6B4F] transition"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#6B6354] uppercase tracking-wide mb-1.5">
              Notes (Optional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="2"
              className="w-full px-3.5 py-2.5 border border-[#B08D57]/30 rounded-sm bg-white text-[#2A2A24] focus:outline-none focus:border-[#3F6B4F] transition"
              placeholder="Any special notes..."
            />
          </div>

          <div className="flex space-x-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#3F6B4F] text-white py-2.5 rounded-sm hover:bg-[#345A42] transition text-sm font-medium uppercase tracking-wide disabled:opacity-50"
            >
              {loading ? 'Processing…' : 'Confirm Borrow'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-[#B08D57]/40 text-[#6B6354] py-2.5 rounded-sm hover:bg-[#B08D57]/10 transition text-sm font-medium uppercase tracking-wide"
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
