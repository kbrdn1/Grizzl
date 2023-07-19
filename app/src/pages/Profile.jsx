import userStore from '../stores/User'
import postStore from '../stores/Post'
import { observer } from 'mobx-react'
import { useEffect, useRef, useState } from 'react'
import { ProfileCircle } from 'iconoir-react'
import SmallArticle from '../components/SmallArticle'
import { validUsername, validPassword } from '../utils/regex'

const Profile = observer(() => {
  const usernameRef = useRef(null),
    passwordRef = useRef(null),
    password2Ref = useRef(null),
    [error, setError] = useState(null),
    [validate, setValidate] = useState(true)

  useEffect(() => {
    userStore.getUser()
    postStore.getAllPosts()
  }, [userStore.user, postStore.posts])

  const handleChangeUsernameInput = () => {
    usernameRef.current.value.length < 3
      ? setValidate(true)
      : setValidate(false)
  }

  const handleChangePasswordInput = () => {
    passwordRef.current.value.length < 6 ||
    password2Ref.current.value.length < 6
      ? setValidate(true)
      : setValidate(false)
  }

  const handleChangeUsername = async (e) => {
    e.preventDefault()

    if (!usernameRef.current.value) {
      setError('Please fill all the fields')
      return
    }

    if (usernameRef.current.value.length < 3) {
      setError('Username must be at least 3 characters long')
      return
    }

    if (usernameRef.current.value.length > 20) {
      setError('Username must be at most 20 characters long')
      return
    }

    if (!validUsername.test(usernameRef.current.value)) {
      setError('Username must contain only letters, numbers and _')
      return
    }

    const data = {
      username: usernameRef.current.value,
    }

    await userStore.updateUsername(data)
    window.newUsername.close()
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()

    if (!passwordRef.current.value) {
      setError('Please fill all the fields')
      return
    }

    if (passwordRef.current.value.length < 6) {
      setError('Password must be at least 3 characters long')
      return
    }

    if (passwordRef.current.value.length > 20) {
      setError('Password must be at most 20 characters long')
      return
    }

    if (!validPassword.test(passwordRef.current.value)) {
      setError('Password must contain only letters, numbers and _')
      return
    }

    if (passwordRef.current.value !== password2Ref.current.value) {
      setError('Passwords must match')
      return
    }

    const data = {
      password: passwordRef.current.value,
    }

    await userStore.updatePassword(data)
    window.newPassword.close()
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center py-10 border-b border-neutral">
        <ProfileCircle className="h-28 w-28" />
        <h1 className="text-2xl font-bold text-secondary">
          {userStore.user.username}
        </h1>
      </div>
      <div className="flex justify-center py-5 gap-3">
        <button
          className="btn btn-primary"
          onClick={() => window.newUsername.showModal()}
        >
          Edit Username
        </button>
        <button
          className="btn btn-primary"
          onClick={() => window.newPassword.showModal()}
        >
          Edit Password
        </button>
      </div>
      <div className="flex flex-col py-10 border-y border-neutral">
        <h2 className="text-2xl font-bold text-secondary text-center">
          My Posts
        </h2>
        <div className="flex flex-col gap-1 pb-5 pt-">
          {postStore.posts ? (
            postStore.posts.map((post) =>
              post.userId == userStore.id ? (
                <SmallArticle key={post._id} article={post} />
              ) : null
            )
          ) : (
            <p className="text-primary text-2xl font-bold pb-3 border-b-2 border-neutral mx-auto">
              No posts yet... 😞
            </p>
          )}
        </div>
      </div>
      <dialog className="modal" id="newUsername">
        <form
          method="dialog"
          className="modal-box flex flex-col gap-2"
          onSubmit={handleChangeUsername}
        >
          <h3 className="font-bold text-lg">Change username</h3>
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
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Username</span>
              <span className="label-text-alt text-orange-400">Required</span>
            </label>
            <input
              type="text"
              placeholder="Type your username here"
              defaultValue={userStore.user.username}
              ref={usernameRef}
              onChange={handleChangeUsernameInput}
              className="input input-bordered w-full"
            />
          </div>
          <div className="modal-action">
            <button
              className="btn btn-primary gap-2 group"
              type="submit"
              disabled={validate}
            >
              Save
            </button>
            <button className="btn" onClick={() => window.newUsername.close()}>
              Cancel
            </button>
          </div>
        </form>
      </dialog>
      <dialog className="modal" id="newPassword">
        <form
          method="dialog"
          className="modal-box flex flex-col gap-2"
          onSubmit={handleChangePassword}
        >
          <h3 className="font-bold text-lg">Change password</h3>
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
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
              <span className="label-text-alt text-orange-400">Required</span>
            </label>
            <input
              type="password"
              placeholder="Type your password here"
              ref={passwordRef}
              onChange={handleChangePasswordInput}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Same Password</span>
              <span className="label-text-alt text-orange-400">Required</span>
            </label>
            <input
              type="password"
              placeholder="Type again your password here"
              ref={password2Ref}
              onChange={handleChangePasswordInput}
              className="input input-bordered w-full"
            />
          </div>
          <div className="modal-action">
            <button
              className="btn btn-primary gap-2 group"
              type="submit"
              disabled={validate}
            >
              Save
            </button>
            <button className="btn" onClick={() => window.newPassword.close()}>
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </div>
  )
})

export default Profile
