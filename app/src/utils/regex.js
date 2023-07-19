export const validPassword = new RegExp(
  '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$'
)

export const validUsername = new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ0-9.,?!\\s]{3,50}$')

export const validComment = new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ0-9.,?!\\s]{3,50}$')

export const validPostTitle = new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ0-9.,?!\\s]{3,50}$')

export const validPostContent = new RegExp(
  '^[A-Za-zÀ-ÖØ-öø-ÿ0-9.,?!\\s]{3,50}$'
)
