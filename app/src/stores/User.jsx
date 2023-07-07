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

  setId(id) {
    this.id = id
    localStorage.setItem('id', id)
  }

  getId() {
    return this.id
  }

  setUser(user) {
    this.user = user
    localStorage.setItem('user', JSON.stringify(user))
  }

  getUser = () => {
    return this.user
  }

  getUsers = async () => {
    const token = localStorage.getItem('jwt')

    await axios
      .get(`${import.meta.env.VITE_API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.users = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }

  verifyToken = async () => {
    const token = localStorage.getItem('jwt')
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
        console.log(err)
        localStorage.removeItem('jwt')
        this.id = null
        localStorage.removeItem('id')
        localStorage.removeItem('user')
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
    this.jwt = null
    this.user = null
    this.id = null
    localStorage.removeItem('jwt')
    localStorage.removeItem('user')
    localStorage.removeItem('id')
  }
}

const userStore = new UserStore()

export default userStore
