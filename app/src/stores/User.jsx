import { makeAutoObservable } from 'mobx'
import axios from 'axios'

class UserStore {
  jwt = null
  id = null
  user = null

  users = null

  constructor() {
    this.jwt = localStorage.getItem('jwt')
    this.id = localStorage.getItem('id')
    this.user = JSON.parse(localStorage.getItem('user'))
    this.getUsers()
    makeAutoObservable(this)
  }

  setJwt(jwt) {
    this.jwt = jwt
    localStorage.setItem('jwt', jwt)
  }

  getJwt() {
    return this.jwt
  }

  removeJwt() {
    this.jwt = null
    localStorage.removeItem('jwt')
  }

  setId(id) {
    this.id = id
    localStorage.setItem('id', id)
  }

  getId() {
    return this.id
  }

  removeId() {
    this.id = null
    localStorage.removeItem('id')
  }

  setUser(user) {
    this.user = user
    localStorage.setItem('user', JSON.stringify(user))
  }

  getUser() {
    return this.user
  }

  removeUser() {
    this.user = null
    localStorage.removeItem('user')
  }

  getUsers() {
    return this.users
  }

  setUsers(users) {
    this.users = users
  }

  removeUsers() {
    this.users = null
  }

  getAllUsers = async () => {
    const token = this.jwt

    await axios
      .get(`${import.meta.env.VITE_API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setUsers(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  verifyToken = async () => {
    const token = this.jwt
    const id = this.id

    await axios
      .post(`${import.meta.env.VITE_API_URL}/auth/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          id: id,
        },
      })
      .catch((err) => {
        this.logout()
      })
  }

  async login(data) {
    await axios
      .post(`${import.meta.env.VITE_API_URL}/auth/signIn`, data)
      .then((res) => {
        this.setJwt(res.data.jwt)
        this.setId(res.data.user._id)
        this.setUser(res.data.user)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  logout() {
    this.removeJwt()
    this.removeId()
    this.removeUser()
    this.removeUsers()
  }

  async updateUsername(data) {
    const token = this.jwt

    await axios
      .patch(
        `${import.meta.env.VITE_API_URL}/users/username/${this.id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        this.setUser(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async updatePassword(data) {
    const token = this.jwt

    await axios
      .patch(
        `${import.meta.env.VITE_API_URL}/users/password/${this.id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        this.setUser(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

const userStore = new UserStore()

export default userStore
