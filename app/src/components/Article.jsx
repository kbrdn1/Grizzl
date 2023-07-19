import { useEffect, useState, useRef } from 'react'
import { observer } from 'mobx-react'
import {
  ProfileCircle,
  Calendar,
  ChatLines,
  Heart,
  Edit,
  BinHalf,
  EyeEmpty,
  EyeOff,
} from 'iconoir-react'
import userStore from '../stores/User'
import postStore from '../stores/Post'
import { useNavigate } from 'react-router-dom'
import { validPostTitle, validPostContent } from '../utils/regex'

const Article = observer(({ article }) => {
  const navigate = useNavigate()

  const titleRef = useRef(null),
    contentRef = useRef(null),
    [isEditing, setIsEditing] = useState(false),
    [error, setError] = useState(false),
    [validate, setValidate] = useState(true)

  useEffect(() => {
    userStore.getAllUsers()
  }, [userStore])

  const printUsername = (userId) => {
    if (userStore.users) {
      const user = userStore.users.find((user) => user._id === userId)
      return user ? (
        user.username
      ) : (
        <span className="loading loading-dots loading-sm"></span>
      )
    }
  }

  const handleChange = () => {
    titleRef.current.value.length < 3 || contentRef.current.value.length < 3
      ? setValidate(true)
      : setValidate(false)
  }

  const handleEdit = async () => {
    if (!titleRef.current.value || !contentRef.current.value) {
      setError('Please fill all the fields')
      return
    }

    if (titleRef.current.value.length < 3) {
      setError('Title must be at least 3 characters long')
      return
    }

    if (contentRef.current.value.length < 3) {
      setError('Content must be at least 3 characters long')
      return
    }

    if (titleRef.current.value.length > 50) {
      setError('Title must be at most 50 characters long')
      return
    }

    if (contentRef.current.value.length > 500) {
      setError('Content must be at most 500 characters long')
      return
    }

    if (!validPostTitle.test(titleRef.current.value)) {
      setError('Title must contain only letters, numbers, spaces and _')
      return
    }

    if (!validPostContent.test(contentRef.current.value)) {
      setError('Content must contain only letters, numbers, spaces and _')
      return
    }

    const data = {
      title: titleRef.current.value,
      content: contentRef.current.value,
    }

    await postStore.updatePost(article._id, data)
    setIsEditing(false)
  }

  const handleVisibility = async () => {
    const data = {
      publiched: !article.publiched,
    }
    await postStore.updatePost(article._id, data)
  }

  const handleDelete = async () => {
    await postStore.deletePost(article._id)
    navigate('/blog')
  }

  return (
    <div className="flex flex-col gap-3 border-y border-neutral p-3">
      <div className="flex gap-2 items-center text-2xl">
        <ProfileCircle />
        <p className="text-neutral-content">{printUsername(article.userId)}</p>
      </div>
      <div className="ml-4">
        <div className="text-2xl font-semibold flex gap-2 items-center justify-between pb-3">
          <h1 className="text-3xl flex items-center gap-3">
            {isEditing ? (
              <input
                ref={titleRef}
                className="input input-bordered w-full"
                defaultValue={article.title}
                onChange={handleChange}
              />
            ) : (
              article.title
            )}
            {article.userId === userStore.user._id && (
              <div className="badge badge-accent">Owner</div>
            )}
          </h1>
          <p className="text-xs flex gap-1 text-slate-500">
            <Calendar />
            {Date(article.createdAt).split(' ').slice(1, 4).join(' ')}
          </p>
        </div>
        {isEditing ? (
          <textarea
            ref={contentRef}
            className="textarea textarea-bordered w-full"
            defaultValue={article.content}
            onChange={handleChange}
          />
        ) : (
          <p className="px-3 border-l-2 border-neutral ml-3">
            {article.content}
          </p>
        )}
        {error && isEditing && (
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
        {isEditing && (
          <div className="flex gap-2 pt-3">
            <button
              className="btn btn-primary group w-full lg:w-fit ml-auto"
              onClick={handleEdit}
              disabled={validate}
            >
              Save changes
            </button>
          </div>
        )}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pt-3">
          <div className="text-neutral-content text-sm flex gap-2">
            <div className="flex items-center gap-1">
              <ChatLines />
              {article.comments && article.comments.length}
            </div>
            <div className="flex items-center gap-1">
              <Heart />
              {article.likes && article.likes.length}
            </div>
          </div>
          {article.userId === userStore.user._id && (
            <div className="flex gap-2">
              <button
                className="btn btn-ghost text-info group"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit'}
                <Edit className="group-hover:-translate-x-1 duration-200 ease-out" />
              </button>
              <button
                className="btn btn-ghost text-warning group"
                onClick={handleVisibility}
              >
                {article.publiched ? (
                  <>
                    Visible
                    <EyeEmpty className="group-hover:-translate-x-1 duration-200 ease-out" />
                  </>
                ) : (
                  <>
                    Hidden
                    <EyeOff className="group-hover:-translate-x-1 duration-200 ease-out" />
                  </>
                )}
              </button>
              <button
                className="btn btn-ghost text-error group"
                onClick={handleDelete}
              >
                Delete
                <BinHalf className="group-hover:-translate-x-1 duration-200 ease-out" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

export default Article
