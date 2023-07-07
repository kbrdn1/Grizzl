import { HomeSimpleDoor, JournalPage, ProfileCircle } from 'iconoir-react'
import { NavLink, Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import UserContext from '../contexts/User.jsx'
import { useContext, useEffect, useState } from 'react'

const SidebarNav = observer(() => {
  const userStore = useContext(UserContext)
  const [user, setUser] = useState({})

  useEffect(() => {
    if (userStore.user) setUser(userStore.user)
  }, [userStore.user])

  return (
    <>
      <div className="fixed z-10 flex-col justify-between gap-2 w-56 h-screen pt-20 pb-4 hidden lg:flex">
        <div className="flex flex-col h-fit pl-4">
          <NavLink
            to="/"
            className="btn btn-ghost normal-case text-xl group justify-start max-w-sm w-52"
          >
            <HomeSimpleDoor className="group-hover:translate-x-1 duration-200 ease-out" />
            <p className="group-hover:translate-x-1 duration-200 ease-out">
              Home
            </p>
          </NavLink>
          <NavLink
            to="/blog"
            className="btn btn-ghost normal-case text-xl group justify-start max-w-sm w-52"
          >
            <JournalPage className="group-hover:translate-x-1 duration-200 ease-out" />
            <p className="group-hover:translate-x-1 duration-200 ease-out">
              Blog
            </p>
          </NavLink>
        </div>
        {userStore.user ? (
          <div className="navbar-start absolute bottom-0 border-t w-full border-neutral p-3">
            <Link
              to="/profile"
              className="gap-3 flex justify-start items-center btn btn-ghost"
            >
              <ProfileCircle className="h-8 w-8" />
              <div className="dropdown">{user.username}</div>
            </Link>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="btm-nav z-10 lg:hidden">
        <NavLink to="/">
          <HomeSimpleDoor className="h-8 w-8" />
          <span className="btm-nav-label hidden md:flex">Home</span>
        </NavLink>
        <NavLink to="/blog">
          <JournalPage className="h-8 w-8" />
          <span className="btm-nav-label hidden md:flex">Blog</span>
        </NavLink>
      </div>
    </>
  )
})

export default SidebarNav
