import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import postStore from '../stores/Post'
import { observer } from 'mobx-react'
import PostContext from '../contexts/Post'
import Article from '../components/Article'

const Post = observer(() => {
  const { id } = useParams()

  useEffect(() => {
    postStore.getPost(id)
  }, [postStore, id])

  return (
    <PostContext.Provider value={postStore}>
      <div className="flex flex-col gap-4 px-3 pb-5 pt-14">
        {postStore.post ? (
          <Article article={postStore.post} />
        ) : (
          <span className="loading loading-dots loading-lg"></span>
        )}
      </div>
    </PostContext.Provider>
  )
})

export default Post
