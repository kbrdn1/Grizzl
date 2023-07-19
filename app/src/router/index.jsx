import { createHashRouter, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Logout from '../pages/Logout'
import App from '../App'
import AuthGuard from '../components/AuthGuard'
import Blog from '../pages/Blog'
import Post from '../pages/Post'
import userStore from '../stores/User'
import Profile from '../pages/Profile'

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element:
          userStore.jwt && userStore.user && userStore.id ? (
            <Navigate to="/" />
          ) : (
            <Login />
          ),
      },
      {
        path: '/register',
        element:
          userStore.jwt && userStore.user && userStore.id ? (
            <Navigate to="/" />
          ) : (
            <Register />
          ),
      },
      {
        path: '/logout',
        element: <Logout />,
      },
      {
        path: '/profile',
        element: (
          <AuthGuard>
            <Profile />
          </AuthGuard>
        ),
      },
      {
        path: '/blog',
        element: (
          <AuthGuard>
            <Blog />
          </AuthGuard>
        ),
      },
      {
        path: '/blog/:id',
        element: (
          <AuthGuard>
            <Post />
          </AuthGuard>
        ),
      },
      {
        path: '*',
        element: <h1>404</h1>,
      },
    ],
  },
])

export default router
