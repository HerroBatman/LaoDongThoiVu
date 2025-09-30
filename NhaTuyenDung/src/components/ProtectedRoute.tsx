import React from 'react'
import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../services/authApi'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // Check if user is authenticated
  if (!isAuthenticated()) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />
  }

  // Render protected content if authenticated
  return <>{children}</>
}
