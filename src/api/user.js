// 包含用户相关的请求 比如用户的登录获取用户的信息，修改用户信息
import http from '@/utils/request.js'
import { getUser } from '@/utils/storage.js'

/**
 * send request to login
 * @param {*} mobile - the mobile phone
 * @param {*} code  - the verification code
 */
export const reqUserLogin = (mobile, code) => {
  return http({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}

export const reqGetUserProfile = () => {
  return http({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
  })
}

/**
 * 请求用户信息
 */
export const reqGetUserInfo = () => {
  return http({
    method: 'get',
    url: '/mp/v1_0/user/profile'
  })
}

/**
 * 修改用户信息
 * @param {*} data {name, intro, email}
 */
export const reqModUserProfile = data => {
  return http({
    method: 'patch',
    url: '/mp/v1_0/user/profile',
    data
  })
}

/**
 * 修改头像
 * @param {*} formData formData格式对象
 */
export const reqModUserImage = formData => {
  return http({
    method: 'patch',
    url: '/mp/v1_0/user/photo',
    data: formData
  })
}
