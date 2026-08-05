import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaBook,
  FaStar,
  FaCalendar,
  FaSpinner,
  FaTrash,
  FaEdit,
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import { getHistory, deleteHistory } from '../services/api';

const ReadingHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await getHistory();
      setHistory(response.data.history || []);
    } catch (error) {
      console.error('❌ Error fetching history:', error);
      toast.error('Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this history?'))
      return;

    setDeleting(id);
    try {
      await deleteHistory(id);
      setHistory(history.filter(item => item._id !== id));
      toast.success('History deleted');
    } catch (error) {
      console.error('❌ Error deleting:', error);
      toast.error('Failed to delete');
    } finally {
      setDeleting(null);
    }
  };

  const getStatusBadge = status => {
    const colors = {
      reading: 'bg-blue-100 text-blue-700',
      completed: 'bg-green-100 text-green-700',
      abandoned: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F3E9] flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-[#3F6B4F] mx-auto" />
          <p className="mt-4 text-[#6B6354]">Loading history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3E9] p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-[#1F2E24] mb-6 flex items-center gap-3">
          <FaBook className="text-[#B08D57]" />
          Reading History
          <span className="text-sm font-normal text-[#6B6354]">
            ({history.length} books)
          </span>
        </h2>

        {history.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <FaBook className="text-6xl text-[#B08D57]/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#1F2E24]">
              No reading history yet
            </h3>
            <p className="text-[#6B6354] mt-2">Start reading some books!</p>
            <Link
              to="/books"
              className="inline-block mt-4 bg-[#B08D57] text-[#132018] px-6 py-2 rounded hover:bg-[#C7A56C] transition"
            >
              Browse Books
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map(item => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
              >
                <div className="flex items-start gap-4">
                  {/* Book Cover */}
                  <div className="w-20 h-28 bg-[#132018] rounded flex items-center justify-center flex-shrink-0">
                    {item.book?.coverImage ? (
                      <img
                        src={item.book.coverImage}
                        alt={item.book?.title}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <FaBook className="text-2xl text-[#B08D57]/30" />
                    )}
                  </div>

                  {/* Book Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-[#1F2E24]">
                          {item.book?.title || 'Unknown Book'}
                        </h3>
                        <p className="text-sm text-[#6B6354]">
                          {item.book?.author || 'Unknown Author'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-2 py-1 rounded ${getStatusBadge(item.status)}`}
                        >
                          {item.status}
                        </span>
                        <button
                          onClick={() => handleDelete(item._id)}
                          disabled={deleting === item._id}
                          className="text-red-400 hover:text-red-600 transition disabled:opacity-50"
                        >
                          {deleting === item._id ? (
                            <FaSpinner className="animate-spin" />
                          ) : (
                            <FaTrash className="text-sm" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Rating */}
                    {item.rating && (
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={
                              i < item.rating
                                ? 'text-yellow-500'
                                : 'text-gray-300'
                            }
                            size={14}
                          />
                        ))}
                        <span className="text-xs text-[#6B6354] ml-1">
                          ({item.rating})
                        </span>
                      </div>
                    )}

                    {/* Dates */}
                    <div className="flex flex-wrap gap-4 mt-2 text-xs text-[#6B6354]">
                      <span className="flex items-center gap-1">
                        <FaCalendar /> Started:{' '}
                        {new Date(item.startedDate).toLocaleDateString()}
                      </span>
                      {item.finishedDate && (
                        <span className="flex items-center gap-1">
                          <FaCalendar /> Finished:{' '}
                          {new Date(item.finishedDate).toLocaleDateString()}
                        </span>
                      )}
                      {item.pagesRead > 0 && (
                        <span>Pages: {item.pagesRead}</span>
                      )}
                    </div>

                    {/* Review */}
                    {item.review && (
                      <p className="mt-2 text-sm text-[#6B6354] bg-[#F7F3E9] p-2 rounded">
                        "{item.review}"
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadingHistory;
