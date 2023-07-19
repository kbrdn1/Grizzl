import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import userStore from '../stores/User'

const Logout = () => {
  useEffect(() => {
    userStore.logout()
  }, [])

  return <Navigate to="/" replace />
}

export default Logout
