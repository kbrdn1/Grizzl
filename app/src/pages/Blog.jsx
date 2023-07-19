import { useEffect, useRef, useState } from 'react'
import PostContext from '../contexts/Post'
import postStore from '../stores/Post'
import { observer } from 'mobx-react'
import SmallArticle from '../components/SmallArticle'
import { DesignNib, Plus } from 'iconoir-react'
import { validPostTitle, validPostContent } from '../utils/regex'

const Blog = observer(() => {
  const titleRef = useRef(null),
    contentRef = useRef(null),
    publishedRef = useRef(true),
    [error, setError] = useState(null),
    [validate, setValidate] = useState(true)

  useEffect(() => {
    postStore.getAllPosts()
  }, [postStore.posts])

  const handleChange = () => {
    titleRef.current.value.length < 3 || contentRef.current.value.length < 3
      ? setValidate(true)
      : setValidate(false)
  }

  const handleCreatePost = async (e) => {
    e.preventDefault()

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
      publiched: publishedRef.current.checked,
    }

    await postStore.createPost(data)

    window.newPost.close()
  }

  return (
    <PostContext.Provider value={postStore}>
      <section className="relative min-h-full">
        <h1 className="sticky text-center top-12 pt-6 w-full bg-base-200 z-[5] text-primary text-4xl font-bold pb-3 border-b-2 border-neutral">
          Blog
        </h1>
        <div className="flex flex-col gap-1 pb-5 pt-">
          {postStore.posts ? (
            postStore.posts.map(
              (post) =>
                post.publiched && <SmallArticle key={post._id} article={post} />
            )
          ) : (
            <p className="text-primary text-2xl font-bold pb-3 border-b-2 border-neutral mx-auto">
              No posts yet... 😞
            </p>
          )}
        </div>
      </section>
      <div className="sticky flex bottom-[4.5rem] lg:bottom-2 w-full justify-center px-3">
        <button
          className="btn btn-info group w-full md:w-fit"
          onClick={() => window.newPost.showModal()}
        >
          <DesignNib className="group-hover:translate-x-1 duration-200 ease-out" />
          Add new article
        </button>
      </div>

      <dialog className="modal" id="newPost">
        <form method="dialog" className="modal-box" onSubmit={handleCreatePost}>
          <h3 className="font-bold text-lg">New article</h3>
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
              <span className="label-text">Title</span>
              <span className="label-text-alt text-orange-400">Required</span>
            </label>
            <input
              type="text"
              placeholder="Type your title here"
              ref={titleRef}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Content</span>
              <span className="label-text-alt text-orange-400">Required</span>
            </label>
            <input
              type="text"
              placeholder="Type your content here"
              ref={contentRef}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text">Published</span>
              <input
                type="checkbox"
                className="toggle toggle-accent"
                defaultChecked
                ref={publishedRef}
                onChange={handleChange}
              />
            </label>
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
            <button className="btn" onClick={() => window.newPost.close()}>
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </PostContext.Provider>
  )
})

export default Blog
