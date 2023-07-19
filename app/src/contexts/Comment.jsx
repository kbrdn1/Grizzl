import { createContext } from 'react'
import CommentStore from '../stores/Comment'

const CommentContext = createContext(CommentStore)

export default CommentContext
