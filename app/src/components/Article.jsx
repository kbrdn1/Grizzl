import { useEffect } from 'react'
import { observer } from 'mobx-react'
import {
  ProfileCircle,
  Calendar,
  ChatLines,
  Heart,
  Edit,
  BinHalf,
} from 'iconoir-react'
import userStore from '../stores/User'

const Article = observer(({ article }) => {
  useEffect(() => {
    userStore.getUsers()
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

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 items-center text-2xl">
        <ProfileCircle />
        <p className="text-neutral-content">{printUsername(article.userId)}</p>
      </div>
      <div className="ml-4 border rounded-md p-2 border-neutral">
        <div className="text-2xl font-semibold flex gap-2 items-center justify-between pb-3">
          <h1 className="text-3xl flex items-center gap-3">
            {article.title}
            {article.userId === userStore.user._id && (
              <div className="badge badge-accent">Owner</div>
            )}
          </h1>
          <p className="text-neutral-content text-sm flex gap-1">
            <Calendar />
            {Date(article.createdAt).split(' ').slice(1, 4).join(' ')}
          </p>
        </div>
        <p className="border-y border-neutral py-3 px-2">{article.content}</p>
        <div className="py-3 flex items-center justify-between">
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
              <button className="btn btn-info group">
                <Edit className="group-hover:-translate-y-1 duration-200 ease-out" />
              </button>
              <button className="btn btn-error group">
                <BinHalf className="group-hover:-translate-y-1 duration-200 ease-out" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

export default Article
