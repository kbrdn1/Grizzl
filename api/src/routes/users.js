const {
  getUsers,
  getUser,
  updateUsername,
  updatePassword,
} = require('../controllers/users')
const isLogged = require('../middlewares/isLogged')

const router = require('express').Router()

router.get('/', isLogged, getUsers)
router.get('/:id', isLogged, getUser)
router.patch('/username/:id', isLogged, updateUsername)
router.patch('/password/:id', isLogged, updatePassword)

module.exports = router
