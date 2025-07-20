// components/ProtectedRoute.js
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/auth'
import ProfilePage from '../components/Profile/ProfilePage'

const ProtectedRoute = () => {
  const { User } = useAuth()

  return User ? <ProfilePage/> : <Navigate to="/login" />
}

export default ProtectedRoute
