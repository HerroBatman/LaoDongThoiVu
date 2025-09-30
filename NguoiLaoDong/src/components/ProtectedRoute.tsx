import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { isAuthenticated, getCurrentUser } from '../lib/auth'

export default function ProtectedRoute() {
  const location = useLocation()
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  const user = getCurrentUser()
  console.log(user)
  if (user && user.status === false) {
    // Only allow personal profile page if account is pending approval
    const pathname = location.pathname
    const isAllowed = pathname === '/profile' || pathname === '/notifications'
    if (!isAllowed) {
      return <Navigate to="/profile" replace state={{ from: location, pending: true }} />
    }
  }
  return <Outlet />
}


