import { Link } from 'react-router-dom'
import { LogIn, LogOut, Community, ProfileCircle } from 'iconoir-react'
import UserContext from '../contexts/User.jsx'
import { useContext } from 'react'
import { observer } from 'mobx-react'

const Nav = observer(() => {
  const userStore = useContext(UserContext)

  return (
    <div className="navbar bg-base-100 fixed z-10 px-4">
      <div className="navbar-start">
        <Link to="/profile" className="lg:hidden">
          {userStore.jwt ? <ProfileCircle className="h-8 w-8" /> : null}
        </Link>
      </div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost normal-case text-xl group">
          <img src="/logo.png" alt="logo" className="h-10 lg:h-8" />
          <p className="group-hover:translate-x-1 duration-200 ease-out hidden lg:block">
            Grizzl
          </p>
        </Link>
      </div>
      <div className="navbar-end gap-2">
        {userStore.jwt ? (
          <Link to="/logout" className="btn btn-outline btn-error group">
            Logout
            <LogOut className="group-hover:translate-x-1 duration-200 ease-out" />
          </Link>
        ) : (
          <>
            <Link to="/login" className="btn btn-primary group">
              Login{' '}
              <LogIn className="group-hover:translate-x-1 duration-200 ease-out" />
            </Link>
            <Link to="/register" className="btn btn-outline btn-primary group">
              Join Us{' '}
              <Community className="group-hover:translate-x-1 duration-200 ease-out" />
            </Link>
          </>
        )}
      </div>
    </div>
  )
})

export default Nav
