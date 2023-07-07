import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [checked, setChecked] = useState(false)
  const [errorChecked, setErrorChecked] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!checked) {
      setErrorChecked(
        "Veuillez accepté les conditions générales d'utilisation pour continuer"
      )
      return
    }

    if (username === '' || password === '') {
      setError('Veuillez remplir tous les champs')
      return
    }

    const data = {
      username: username,
      password: password,
    }

    await axios
      .post(`${import.meta.env.VITE_API_URL}/auth/signUp`, data)
      .then(() => {
        navigate('/login')
      })
      .catch((err) => {
        setError(err.response.data.error)
      })
  }

  return (
    <div className="flex justify-center h-screen items-start lg:items-center gap-5 pt-24 lg:pt-0 px-4 md:px-20 lg:px-0">
      <form
        className="flex flex-col overflow-hidden rounded-lg justify-center w-full lg:w-1/2"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold py-3">Join the community!</h1>
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
              onChange={(e) => setUsername(e.target.value)}
              className="input input-bordered w-full"
            />
            <label className="label"></label>
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
          <div className="form-control w-fit">
            <span className="label-text-alt text-red-500">{errorChecked}</span>
            <label className="cursor-pointer label gap-3">
              <input
                type="checkbox"
                className="toggle toggle-primary"
                defaultChecked={checked}
                onChange={() => setChecked(!checked)}
              />
              <span className="label-text">
                J'accepte les conditions générales d'utilisations
              </span>
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

export default Register
