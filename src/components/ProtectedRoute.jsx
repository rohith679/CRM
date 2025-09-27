import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { checkAuth, user, logout } = useAuthStore();
  const location = useLocation();

  const isAuthenticated = checkAuth();

  if (!isAuthenticated || !user) {
    logout(); // Clear any invalid tokens
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;