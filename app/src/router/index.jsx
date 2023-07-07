import { createBrowserRouter, Navigate } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import Logout from '../pages/Logout.jsx'
import App from '../App.jsx'
import AuthGuard from '../components/AuthGuard.jsx'
import Blog from '../pages/Blog.jsx'
import Post from '../pages/Post.jsx'

const router = createBrowserRouter([
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
          localStorage.getItem('jwt') &&
          localStorage.getItem('id') &&
          localStorage.getItem('user') ? (
            <Navigate to="/" />
          ) : (
            <Login />
          ),
      },
      {
        path: '/register',
        element:
          localStorage.getItem('jwt') &&
          localStorage.getItem('id') &&
          localStorage.getItem('user') ? (
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
