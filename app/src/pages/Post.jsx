import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import postStore from '../stores/Post'
import { observer } from 'mobx-react'
import PostContext from '../contexts/Post'
import Article from '../components/Article'
import { Plus, ArrowLeft } from 'iconoir-react'
import CommentContext from '../contexts/Comment'
import commentStore from '../stores/Comment'
import Comment from '../components/Comment'
import { validComment } from '../utils/regex'

const Post = observer(() => {
  const { id } = useParams()

  const contentRef = useRef(null),
    [error, setError] = useState(null),
    [validate, setValidate] = useState(true)

  useEffect(() => {
    postStore.getPostById(id)
    commentStore.getCommentsByPost(id)
  }, [postStore, commentStore.comments, id])

  const handleChange = () => {
    contentRef.current.value.length < 3 ? setValidate(true) : setValidate(false)
  }

  const handleCreateComment = async (e) => {
    e.preventDefault()

    if (!contentRef.current.value) {
      setError('Please fill all the fields')
      return
    }

    if (contentRef.current.value.length < 3) {
      setError('Content must be at least 3 characters long')
      return
    }

    if (contentRef.current.value.length > 200) {
      setError('Content must be at most 200 characters long')
      return
    }

    if (!validComment.test(contentRef.current.value)) {
      setError('Content must contain only letters, numbers, spaces and _')
      return
    }

    const data = {
      content: contentRef.current.value,
      postId: id,
    }

    await commentStore.createComment(data)

    window.newComment.close()
  }

  return (
    <PostContext.Provider value={postStore}>
      <div className="flex flex-col pb-5 pt-14 relative min-h-full">
        <Link
          to="/blog"
          className="btn btn-ghost btn-sm absolute left-2 top-3 group hover:text-red-400"
        >
          <ArrowLeft />
          <p className="group-hover:-translate-x-1 duration-200 ease-out">
            Back to blog
          </p>
        </Link>
        {postStore.post ? (
          <Article article={postStore.post} />
        ) : (
          <span className="loading loading-dots loading-lg"></span>
        )}
        <CommentContext.Provider value={commentStore}>
          <div className="flex flex-col">
            {commentStore.comments ? (
              commentStore.comments.map((comment) => (
                <Comment key={comment._id} comment={comment} />
              ))
            ) : (
              <p className="text-neutral-content text-xl text-center py-3 font-bold pb-3 mx-auto">
                No comments yet... 😞
              </p>
            )}
          </div>
        </CommentContext.Provider>

        <dialog className="modal" id="newComment">
          <form
            method="dialog"
            className="modal-box flex flex-col gap-2"
            onSubmit={handleCreateComment}
          >
            <h3 className="font-bold text-lg">New Comment</h3>
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
                <span className="label-text">Content</span>
                <span className="label-text-alt text-orange-400">Required</span>
              </label>
              <textarea
                type="text"
                placeholder="Type your content here"
                ref={contentRef}
                onChange={handleChange}
                className="input input-bordered w-full"
              ></textarea>
            </div>
            <div className="modal-action">
              <button
                className="btn btn-primary gap-2 group"
                type="submit"
                disabled={validate}
              >
                Add
                <Plus className="group-hover:-translate-x-1 duration-200 ease-out" />
              </button>
              <button className="btn" onClick={() => window.newComment.close()}>
                Cancel
              </button>
            </div>
          </form>
        </dialog>
      </div>
      <div className="sticky flex bottom-[4.5rem] lg:bottom-2 w-full justify-center px-3">
        <button
          className="btn btn-info group w-full md:w-fit"
          onClick={() => window.newComment.showModal()}
        >
          <Plus className="group-hover:translate-x-1 duration-200 ease-out" />
          Add new comment
        </button>
      </div>
    </PostContext.Provider>
  )
})

export default Post
