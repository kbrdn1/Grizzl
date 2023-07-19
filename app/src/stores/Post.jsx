import { makeAutoObservable } from 'mobx'
import axios from 'axios'
import userStore from './User'
import { toJS } from 'mobx'

class PostStore {
  posts = null
  post = null

  constructor() {
    makeAutoObservable(this)
  }

  getPosts() {
    return this.posts
  }

  setPosts(posts) {
    this.posts = posts
  }

  removePosts() {
    this.posts = null
  }

  getPost() {
    return this.post
  }

  setPost(post) {
    this.post = post
  }

  removePost() {
    this.post = null
  }

  pushPost(post) {
    this.post ? this.posts.push(post) : this.getAllPosts()
  }

  updatePosts(post) {
    this.posts
      ? (this.posts = this.posts.map((p) => {
          return p.id === post._id ? post : p
        }))
      : this.getAllPosts()
  }

  deletePostFromList(id) {
    this.posts = this.posts.filter((post) => post.id !== id)
  }

  async getAllPosts() {
    const token = userStore.getJwt()

    await axios
      .get(`${import.meta.env.VITE_API_URL}/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setPosts(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async getPostById(id) {
    const token = userStore.getJwt()

    await axios
      .get(`${import.meta.env.VITE_API_URL}/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setPost(res.data)
      })
  }

  async createPost(data) {
    const token = userStore.getJwt()

    data.userId = userStore.user._id

    await axios
      .post(`${import.meta.env.VITE_API_URL}/posts`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.pushPost(res.data)
      })
  }

  async updatePost(id, data) {
    const token = userStore.getJwt()

    await axios
      .patch(`${import.meta.env.VITE_API_URL}/posts/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setPost(res.data)
        this.updatePosts(res.data)
      })
  }

  async deletePost(id) {
    const token = userStore.getJwt()

    await axios
      .delete(`${import.meta.env.VITE_API_URL}/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        this.removePost()
        this.deletePostFromList(id)
      })
  }

  async likePost(id) {
    const token = userStore.getJwt()

    await axios
      .get(`${import.meta.env.VITE_API_URL}/posts/like/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setPost(res.data)
        this.updatePosts(res.data)
      })
  }
}

export default new PostStore()
