import { useEffect } from 'react'
import { observer } from 'mobx-react'
import { ChatLines, Heart, Calendar, ProfileCircle } from 'iconoir-react'
import userStore from '../stores/User'
import { Link } from 'react-router-dom'
import postStore from '../stores/Post'

const SmallArticle = observer(({ article }) => {
  useEffect(() => {
    userStore.getAllUsers()
  }, [userStore, postStore.post])

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

  const handleLike = async (articleId) => {
    await postStore.likePost(articleId)
  }

  return (
    <div className="border-b border-neutral px-6 py-3 shadow-xl hover:shadow-2xl transition duration-300 ease-in-out hover:translate-y-1">
      <div className="pb-3 flex justify-between gap-2 items-center">
        <div className="text-2xl font-semibold flex gap-2 items-center">
          <div className="flex items-center gap-2">
            <ProfileCircle />
            <p className="text-neutral-content">
              {printUsername(article.userId)}
            </p>
          </div>
        </div>
        <p className="text-slate-600 font-bold text-xs flex gap-1">
          <Calendar />
          {Date(article.createdAt).split(' ').slice(1, 4).join(' ')}
        </p>
      </div>
      <Link to={`/blog/${article._id}`}>
        <div className="text-neutral-content p-2 pt-0 ml-4 overflow-x-hidden border-l-2 border-neutral">
          <div className="flex items-center gap-2 text-lg">
            <h2 className="text-secondary font-semibold flex gap-2 items-center">
              {article.title}
              {article.userId === userStore.user._id && (
                <div className="badge badge-accent">Owner</div>
              )}
            </h2>
          </div>
          <p className="pl-4">
            {article.content.length > 150
              ? article.content.slice(0, 150) + '...'
              : article.content}
          </p>
        </div>
      </Link>
      <div className="pt-3">
        <div className="text-neutral-content text-sm flex gap-2 ml-2">
          <div className="flex items-center gap-1">
            <ChatLines />
            {article.comments.length}
          </div>
          <button
            className="flex items-center gap-1 btn btn-ghost"
            onClick={() => handleLike(article._id)}
          >
            <Heart
              fill={
                article.likes.includes(userStore.user._id)
                  ? 'red'
                  : 'transparent'
              }
            />
            {article.likes.length}
          </button>
        </div>
      </div>
    </div>
  )
})

export default SmallArticle
