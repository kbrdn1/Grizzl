import { makeAutoObservable } from 'mobx'
import axios from 'axios'

class PostStore {
  posts = null
  post = null

  constructor() {
    makeAutoObservable(this)
  }

  setPosts(posts) {
    this.posts = posts
  }

  setPost(post) {
    this.post = post
  }

  async getPosts() {
    const token = localStorage.getItem('jwt')

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

  async getPost(id) {
    const token = localStorage.getItem('jwt')

    await axios
      .get(`${import.meta.env.VITE_API_URL}/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setPost(res.data)
      })
  }

  async createPost(data) {
    const token = localStorage.getItem('jwt')

    await axios
      .post(`${import.meta.env.VITE_API_URL}/posts`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.posts.push(res.data)
      })
  }

  async updatePost(id, data) {
    const token = localStorage.getItem('jwt')

    await axios
      .put(`${import.meta.env.VITE_API_URL}/posts/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.posts = this.posts.map((post) => {
          return post.id === id ? res.data : post
        })
      })
  }

  async deletePost(id) {
    const token = localStorage.getItem('jwt')

    await axios
      .delete(`${import.meta.env.VITE_API_URL}/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        this.posts = this.posts.filter((post) => post.id !== id)
      })
  }
}

export default new PostStore()
