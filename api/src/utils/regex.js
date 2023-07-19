const validPassword = new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$')

const validUsername = new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ0-9.,?!\\s]{3,50}$')

const validComment = new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ0-9.,?!\\s]{3,50}$')

const validPostTitle = new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ0-9.,?!\\s]{3,50}$')

const validPostContent = new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ0-9.,?!\\s]{3,50}$')

module.exports = {
  validPassword,
  validUsername,
  validComment,
  validPostTitle,
  validPostContent,
}
