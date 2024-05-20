// ProtectedRoute.js
import React, { useContext } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

function ProtectedRoute (props) {

  const { isAuthenticated } = useAuth();

  return (
        isAuthenticated ? <Outlet {...props} /> : <Navigate to="/login" />
  );
};

export default ProtectedRoute;
