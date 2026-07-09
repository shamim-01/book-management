import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // ✅ Check if token exists
  const token = localStorage.getItem('token');

  // ✅ If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ✅ If token exists, show the page
  return children;
};

export default ProtectedRoute;
