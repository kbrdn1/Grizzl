import { Link } from 'react-router-dom'
import { ArrowRight, LogIn } from 'iconoir-react'
import { observer } from 'mobx-react'

const Home = observer(() => {
  return (
    <div className="lg:hero min-h-screen bg-base-200 pt-20 lg:pt-0">
      <div className="hero-content flex-col lg:flex-row lg:gap-10 ">
        <img src="/hero.jpg" className="rounded-lg shadow-2xl" />

        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Welcom to Grizzl!</h1>
          <div className="py-6 text-lg flex flex-col gap-2">
            <p>
              Unleash your creativity, connect with like-minded individuals, and
              share your unique stories with the world. Join us today and be
              part of a vibrant community of passionate bloggers.
            </p>
            <span>Express. Connect. Inspire. Grizzl.</span>
          </div>
          {localStorage.getItem('jwt') ? (
            <Link className="btn btn-primary w-full group" to="/blog">
              Go to Blog{' '}
              <ArrowRight className="group-hover:translate-x-1 duration-200 ease-out" />
            </Link>
          ) : (
            <Link className="btn btn-primary w-full group" to="/login">
              Login{' '}
              <LogIn className="group-hover:translate-x-1 duration-200 ease-out" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
})

export default Home
