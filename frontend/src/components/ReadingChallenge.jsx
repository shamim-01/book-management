// components/ReadingChallenge.jsx
import React, { useState, useEffect } from 'react';
import {
  FaTrophy,
  FaBullseye,
  FaSpinner,
  FaEdit,
  FaSave,
  FaTimes,
  FaBook,
  FaStar,
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import {
  getChallenge,
  createChallenge,
  updateChallenge,
} from '../services/api';

const ReadingChallenge = () => {
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [target, setTarget] = useState(50);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchChallenge();
  }, []);

  const fetchChallenge = async () => {
    try {
      setLoading(true);
      const response = await getChallenge();
      setChallenge(response.data.challenge);
      if (response.data.challenge) {
        setTarget(response.data.challenge.target);
      }
    } catch (error) {
      console.error('❌ Error fetching challenge:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateChallenge = async () => {
    if (!target || target < 1) {
      toast.error('Please enter a valid target');
      return;
    }

    setSubmitting(true);
    try {
      const response = await createChallenge({
        target,
        year: new Date().getFullYear(),
      });
      setChallenge(response.data.challenge);
      setIsEditing(false);
      toast.success('Reading challenge created! 🎯');
    } catch (error) {
      console.error('❌ Error creating challenge:', error);
      toast.error(
        error.response?.data?.message || 'Failed to create challenge',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateChallenge = async () => {
    if (!target || target < 1) {
      toast.error('Please enter a valid target');
      return;
    }

    setSubmitting(true);
    try {
      const response = await updateChallenge(challenge._id, { target });
      setChallenge(response.data.challenge);
      setIsEditing(false);
      toast.success('Challenge updated! 🎯');
    } catch (error) {
      console.error('❌ Error updating challenge:', error);
      toast.error(
        error.response?.data?.message || 'Failed to update challenge',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const progress = challenge ? (challenge.current / challenge.target) * 100 : 0;
  const isComplete = progress >= 100;

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-center">
        <FaSpinner className="animate-spin text-2xl text-[#3F6B4F]" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-[#1F2E24] flex items-center gap-2">
          <FaBullseye className="text-[#B08D57]" />
          {new Date().getFullYear()} Reading Challenge
        </h3>
        {challenge && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-[#3F6B4F] hover:text-[#1F2E24] transition text-sm flex items-center gap-1"
          >
            <FaEdit /> Edit
          </button>
        )}
      </div>

      {!challenge && !isEditing ? (
        <div className="text-center py-6">
          <p className="text-[#6B6354] mb-4">
            Set your reading goal for {new Date().getFullYear()}
          </p>
          <div className="flex items-center justify-center gap-3">
            <input
              type="number"
              value={target}
              onChange={e => setTarget(parseInt(e.target.value) || 0)}
              className="w-24 px-3 py-2 border border-[#B08D57]/30 rounded focus:outline-none focus:border-[#3F6B4F] text-center"
              min="1"
              max="500"
            />
            <span className="text-[#6B6354]">books</span>
            <button
              onClick={handleCreateChallenge}
              disabled={submitting}
              className="bg-[#3F6B4F] text-white px-6 py-2 rounded hover:bg-[#345A42] transition disabled:opacity-50"
            >
              {submitting ? <FaSpinner className="animate-spin" /> : 'Set Goal'}
            </button>
          </div>
        </div>
      ) : isEditing ? (
        <div className="flex items-center justify-center gap-3 py-4">
          <input
            type="number"
            value={target}
            onChange={e => setTarget(parseInt(e.target.value) || 0)}
            className="w-24 px-3 py-2 border border-[#B08D57]/30 rounded focus:outline-none focus:border-[#3F6B4F] text-center"
            min="1"
            max="500"
          />
          <span className="text-[#6B6354]">books</span>
          <button
            onClick={handleUpdateChallenge}
            disabled={submitting}
            className="bg-[#3F6B4F] text-white px-4 py-2 rounded hover:bg-[#345A42] transition disabled:opacity-50 flex items-center gap-2"
          >
            {submitting ? <FaSpinner className="animate-spin" /> : <FaSave />}
            Save
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setTarget(challenge?.target || 50);
            }}
            className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition flex items-center gap-2"
          >
            <FaTimes /> Cancel
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-[#6B6354] mb-1">
              <span>{challenge.current} books read</span>
              <span>Target: {challenge.target}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className={`h-4 rounded-full transition-all duration-500 ${
                  isComplete ? 'bg-green-500' : 'bg-[#3F6B4F]'
                }`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-[#6B6354] mt-1">
              <span>{Math.round(progress)}% completed</span>
              <span>{challenge.target - challenge.current} books to go</span>
            </div>
          </div>

          {isComplete && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
              <FaTrophy className="text-3xl text-yellow-500 mx-auto mb-1" />
              <p className="font-semibold text-green-700">
                🎉 Challenge Complete!
              </p>
              <p className="text-sm text-green-600">
                You read {challenge.current} books in {challenge.year}!
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-[#F7F3E9] p-3 rounded text-center">
              <p className="text-xs text-[#6B6354]">Progress</p>
              <p className="text-xl font-bold text-[#1F2E24]">
                {Math.round(progress)}%
              </p>
            </div>
            <div className="bg-[#F7F3E9] p-3 rounded text-center">
              <p className="text-xs text-[#6B6354]">Remaining</p>
              <p className="text-xl font-bold text-[#1F2E24]">
                {challenge.target - challenge.current}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingChallenge;
