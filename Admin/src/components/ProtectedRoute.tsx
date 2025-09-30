import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../lib/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  
  if (!isAuthenticated()) {
    // Redirect to login page with return url
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
