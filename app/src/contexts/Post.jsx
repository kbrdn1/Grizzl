import { createContext } from 'react'
import postStore from '../stores/Post'

const PostContext = createContext(postStore)

export default PostContext
