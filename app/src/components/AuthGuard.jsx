import { Navigate } from 'react-router-dom'
import userStore from '../stores/User.jsx'

const AuthGuard = ({ children }) => {
  if (!userStore.jwt) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default AuthGuard
