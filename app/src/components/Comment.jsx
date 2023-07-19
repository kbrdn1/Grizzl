import { ProfileCircle, Edit, BinHalf } from 'iconoir-react'
import { observer } from 'mobx-react'
import userStore from '../stores/User'
import commentStore from '../stores/Comment'
import { useState, useRef } from 'react'
import { validComment } from '../utils/regex'

const Comment = observer(({ comment }) => {
  const [isEditing, setIsEditing] = useState(false),
    contentRef = useRef(null),
    [error, setError] = useState(null),
    [validate, setValidate] = useState(true)

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
    contentRef.current.value.length < 3 ? setValidate(true) : setValidate(false)
  }

  const handleDelete = async () => {
    await commentStore.deleteComment(comment._id)
  }

  const handleEdit = async () => {
    if (!contentRef.current.value) {
      setError('Please fill all the fields')
      return
    }

    if (contentRef.current.value.length < 3) {
      setError('Comment must be at least 3 characters long')
      return
    }

    if (!validComment(contentRef.current.value)) {
      setError('Comment must contain only letters and numbers')
      return
    }

    const data = {
      content: contentRef.current.value,
    }
    await commentStore.updateComment(comment._id, data)
    setIsEditing(false)
  }

  return (
    <div className="relative flex flex-col ml-10 gap-2 border-l-2 border-b border-neutral px-2 py-3">
      <span
        className={`absolute top-1/2 -translate-y-1/2 -left-[.215rem] ${
          comment.userId === userStore.user._id ? 'bg-secondary' : 'bg-primary'
        } w-1 h-2/4 rounded-full`}
      ></span>
      <div className="flex items-center gap-2 font-semibold">
        <ProfileCircle className="w-8 h-8" />
        <p className="text-neutral-content">{printUsername(comment.userId)}</p>
        {comment.userId === userStore.user._id && (
          <div className="badge badge-accent">Me</div>
        )}
        {comment.userId === userStore.user._id && (
          <div className="flex gap-2 justify-end w-fit ml-auto">
            <button
              className="btn btn-ghost text-info group"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="group-hover:rotate-12 duration-200 ease-out" />
            </button>
            <button
              className="btn btn-ghost text-error group"
              onClick={handleDelete}
            >
              <BinHalf className="group-hover:rotate-12 duration-200 ease-out" />
            </button>
          </div>
        )}
      </div>
      <div className="pl-5">
        {isEditing ? (
          <form className="flex flex-col gap-2" onSubmit={handleEdit}>
            <textarea
              ref={contentRef}
              className="input input-bordered w-full"
              defaultValue={comment.content}
              onChange={handleChange}
            ></textarea>
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
            <button
              className="btn btn-primary w-full lg:w-fit ml-auto gap-2 group"
              type="submit"
              disabled={validate}
            >
              Save
            </button>
          </form>
        ) : (
          <p className="px-3 border-l-2 border-neutral ml-3">
            {comment.content}
          </p>
        )}
      </div>
    </div>
  )
})

export default Comment
