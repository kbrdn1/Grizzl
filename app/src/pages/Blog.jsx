import { useEffect, useState } from 'react'
import PostContext from '../contexts/Post'
import postStore from '../stores/Post'
import { observer } from 'mobx-react'
import SmallArticle from '../components/SmallArticle'
import { DesignNib, Plus } from 'iconoir-react'

const Blog = observer(() => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    postStore.getPosts()
  }, [postStore])

  return (
    <PostContext.Provider value={postStore}>
      <section className="relative">
        <h1 className="sticky text-center top-12 pt-6 w-full bg-base-200 z-[5] text-primary text-4xl font-bold pb-3 border-b-2 border-neutral">
          Blog
        </h1>
        <div className="flex flex-col gap-4 px-3 pb-5 pt-14">
          {postStore.posts ? (
            postStore.posts.map((post) => (
              <SmallArticle key={post._id} article={post} />
            ))
          ) : (
            <p className="text-primary text-2xl font-bold pb-3 border-b-2 border-neutral">
              No posts yet... 😞
            </p>
          )}
        </div>
      </section>
      <div className="sticky flex bottom-20 lg:bottom-2 w-full justify-center">
        <button
          className="btn btn-info group"
          onClick={() => window.my_modal_1.showModal()}
        >
          <DesignNib className="group-hover:-translate-y-1 duration-200 ease-out" />
          Add new article
        </button>
      </div>

      <dialog className="modal" id="my_modal_1">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">New article</h3>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Title</span>
              <span className="label-text-alt text-orange-400">Required</span>
            </label>
            <input
              type="text"
              placeholder="Type your title here"
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
              className="input input-bordered w-full"
            />
          </div>
          <div className="modal-action">
            <button className="btn btn-primary gap-2 group">
              Add
              <Plus className="group-hover:-translate-x-1 duration-200 ease-out" />
            </button>
            <button className="btn">Cancel</button>
          </div>
        </form>
      </dialog>
    </PostContext.Provider>
  )
})

export default Blog
