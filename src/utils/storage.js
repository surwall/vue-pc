const key = 'hm-tt-pc-userinfo'

// 保存用户信息到本地
export const setUser = (user) => {
  localStorage.setItem(key, JSON.stringify(user))
}

// 从本地获取用户信息
export const getUser = () => {
  return JSON.parse(localStorage.getItem(key)) || {}
}

// 删除用户信息
export const delUser = () => {
  localStorage.removeItem(key)
}
