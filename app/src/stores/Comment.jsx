import { makeAutoObservable } from 'mobx'
import axios from 'axios'
import userStore from './User'

class CommentStore {
  comments = null
  comment = null

  constructor() {
    makeAutoObservable(this)
  }

  getComments() {
    return this.comments
  }

  setComments(comments) {
    this.comments = comments
  }

  removeComments() {
    this.comments = null
  }

  getComment() {
    return this.comment
  }

  setComment(comment) {
    this.comment = comment
  }

  removeComment() {
    this.comment = null
  }

  pushComment(comment) {
    this.comments
      ? this.comments.push(comment)
      : this.getCommentsByPost(comment.postId)
  }

  updateComments(comment) {
    this.comments
      ? (this.comments = this.comments.map((c) => {
          return c.id === comment._id ? comment : c
        }))
      : this.getCommentsByPost(comment.postId)
  }

  deleteCommentFromList(id) {
    this.comments = this.comments.filter((comment) => comment.id !== id)
  }

  async getCommentsByPost(postId) {
    const token = userStore.getJwt()

    await axios
      .get(`${import.meta.env.VITE_API_URL}/comments/post/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setComments(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async getCommentById(id) {
    const token = userStore.getJwt()

    await axios
      .get(`${import.meta.env.VITE_API_URL}/comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setComment(res.data)
      })
  }

  async createComment(data) {
    const token = userStore.getJwt()

    data.userId = userStore.getId()

    await axios
      .post(`${import.meta.env.VITE_API_URL}/comments`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.pushComment(res.data)
      })
  }

  async updateComment(id, data) {
    const token = userStore.getJwt()

    await axios
      .patch(`${import.meta.env.VITE_API_URL}/comments/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setComment(res.data)
        this.updateComments(res.data)
      })
  }

  async deleteComment(id) {
    const token = userStore.getJwt()

    await axios
      .delete(`${import.meta.env.VITE_API_URL}/comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        this.deleteCommentFromList(id)
      })
  }
}

export default new CommentStore()
