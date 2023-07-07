import { Outlet } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import SidebarNav from './components/SidebarNav.jsx'
import UserContext from './contexts/User.jsx'
import userStore from './stores/User.jsx'

const App = () => {
  return (
    <>
      <UserContext.Provider value={userStore}>
        <Nav />
        <SidebarNav />
        <main className="relative min-h-screen bg-base-200 pt-16 lg:pl-56 flex pb-16 lg:pb-0">
          <div className="border-x border-neutral max-w-5xl w-full">
            <Outlet />
          </div>
        </main>
      </UserContext.Provider>
    </>
  )
}

export default App
