import { createContext } from 'react'
import userStore from '../stores/User'

const UserContext = createContext(userStore)

export default UserContext
