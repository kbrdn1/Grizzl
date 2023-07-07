import { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import UserContext from '../contexts/User.jsx'

const Logout = () => {
  const userStore = useContext(UserContext)

  useEffect(() => {
    userStore.logout()
  }, [])

  return <Navigate to="/" replace />
}

export default Logout
