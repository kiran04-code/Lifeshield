// components/ProtectedRoute.js
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/auth'
import ProfilePage from '../components/Profile/ProfilePage'
import Login from '../components/Login'

const ProtectedRoute = () => {
  const { User } = useAuth()

  return User ? <ProfilePage/> : <Login/> 
}

export default ProtectedRoute
