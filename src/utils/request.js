import axios from 'axios'
import { getUser } from '@/utils/storage.js'

// const instance = axios.create({
//   baseURL: 'https://some-domain.com/api/',
//   timeout: 1000,
//   headers: { 'X-Custom-Header': 'foobar' }
// })

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  timeout: 3000
})

// 添加请求拦截器
instance.interceptors.request.use((config) => {
  const userInfo = getUser()
  if (userInfo.token) {
    config.headers.Authorization = 'Bearer ' + userInfo.token
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

export default instance
