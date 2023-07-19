import { useState, useRef } from 'react'
import { useContext } from 'react'
import UserContext from '../contexts/User'
import { useNavigate } from 'react-router-dom'
import { validUsername, validPassword } from '../utils/regex'

const Login = () => {
  const navigate = useNavigate()
  const userStore = useContext(UserContext)

  const usernameRef = useRef(null),
    passwordRef = useRef(null),
    [error, setError] = useState(null),
    [validate, setValidate] = useState(true)

  const handleChange = () => {
    usernameRef.current.value.length < 3 || passwordRef.current.value.length < 6
      ? setValidate(true)
      : setValidate(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!usernameRef.current.value || !passwordRef.current.value) {
      setError('Please fill all the fields')
      return
    }

    if (!validUsername.test(usernameRef.current.value)) {
      setError('Username must contain only letters, numbers, spaces and _')
      return
    }

    if (!validPassword.test(passwordRef.current.value)) {
      setError(
        'Password must contain minimum six characters, at least one letter and one number'
      )
      return
    }

    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
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
        {error && (
          <div className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}
        <div className="flex flex-col p-3">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Username:</span>
              <span className="label-text-alt text-orange-400">Required</span>
            </label>
            <input
              type="text"
              placeholder="username"
              ref={usernameRef}
              onChange={handleChange}
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
              placeholder="password"
              ref={passwordRef}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
            <label className="label">
              <span className="label-text-alt"></span>
              <span className="label-text-alt"></span>
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-active btn-primary mt-2"
            disabled={validate}
          >
            Connexion
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
