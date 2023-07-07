import { useState } from 'react'
import { useContext } from 'react'
import UserContext from '../contexts/User'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const userStore = useContext(UserContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      username: username,
      password: password,
    }

    await userStore.login(data)

    if (userStore.jwt) navigate('/')
  }

  return (
    <div className="flex justify-center h-screen items-start lg:items-center gap-5 pt-20 lg:pt-0 px-4 md:px-20 lg:px-0">
      <form
        className="flex flex-col overflow-hidden rounded-lg justify-center w-full lg:w-1/2"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold py-3 borber-b-2 border-neutral">
          Connexion
        </h1>
        <div className="flex flex-col p-3">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Username:</span>
              <span className="label-text-alt text-orange-400">Required</span>
            </label>
            <input
              type="text"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              className="input input-bordered w-full"
            />
            <label className="label">
              <span className="label-text-alt"></span>
              <span className="label-text-alt"></span>
            </label>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password:</span>
              <span className="label-text-alt text-orange-400">Required</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full"
            />
            <label className="label">
              <span className="label-text-alt"></span>
              <span className="label-text-alt"></span>
            </label>
          </div>
          <button type="submit" className="btn btn-active btn-primary">
            Connexion
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
