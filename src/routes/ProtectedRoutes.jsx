import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigate, useLocation } from 'react-router-dom'; // Import Navigate and useLocation
import { useAuth } from '../contexts/AuthContext';
const ProtectedRoute = ({ element }) => {
  const { user, loading } = useAuth();
  const location = useLocation(); // Optional: to remember where they tried to go

  const navigate = useNavigate();

  // While loading, maybe render a spinner or null
  if (loading) {
    return null; // Or a loading spinner component provided by the theme perhaps?
  }

  // If authenticated, render the element
  if (user) {
    // console.log(user);
    return element;
  }

  // If not authenticated, redirect to the login page
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
