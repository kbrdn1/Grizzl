import { useEffect } from 'react'
import { observer } from 'mobx-react'
import {
  ChatLines,
  Heart,
  PageFlip,
  Calendar,
  ProfileCircle,
} from 'iconoir-react'
import userStore from '../stores/User'
import { Link } from 'react-router-dom'

const SmallArticle = observer(({ article }) => {
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
    <Link
      to={'/blog/' + article._id}
      key={article._id}
      className="border-2 border-neutral rounded-md p-3 shadow-xl hover:shadow-2xl transition duration-300 ease-in-out hover:translate-y-1"
    >
      <div className="pb-3 border-b-2 border-neutral flex justify-between gap-2 items-center">
        <div className="text-2xl font-semibold flex gap-2 items-center">
          <PageFlip className="text-sm" />
          <h2 className="text-secondary flex gap-2 items-center">
            {article.title}
            {article.userId === userStore.user._id && (
              <div className="badge badge-accent">Owner</div>
            )}
          </h2>
        </div>
        <p className="text-neutral-content text-sm flex gap-1">
          <Calendar />
          {Date(article.createdAt).split(' ').slice(1, 4).join(' ')}
        </p>
      </div>
      <div className="text-neutral-content p-2 overflow-x-hidden">
        <div className="flex gap-2">
          <ProfileCircle />
          <p className="text-sm text-neutral-content">
            {printUsername(article.userId)}
          </p>
        </div>
        <p className='pl-4'>
          {article.content.length > 150
            ? article.content.slice(0, 150) + '...'
            : article.content}
        </p>
      </div>
      <div className="pt-3 border-t-2 border-neutral">
        <div className="text-neutral-content text-sm flex gap-2">
          <div className="flex items-center gap-1">
            <ChatLines />
            {article.comments.length}
          </div>
          <div className="flex items-center gap-1">
            <Heart />
            {article.likes.length}
          </div>
        </div>
      </div>
    </Link>
  )
})

export default SmallArticle
