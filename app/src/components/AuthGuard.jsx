import UserContext from '../contexts/User.jsx'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

const AuthGuard = ({ children }) => {
  const userStore = useContext(UserContext)

  if (!userStore.jwt) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default AuthGuard
