import { createBrowserRouter } from 'react-router-dom'
import App from '../pages/App.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '*',
    element: <h1>404</h1>,
  },
])

export default router
