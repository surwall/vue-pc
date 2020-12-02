import axios from 'axios'
import JSONbig from 'json-bigint'
import { getUser } from '@/utils/storage.js'

// const instance = axios.create({
//   baseURL: 'https://some-domain.com/api/',
//   timeout: 1000,
//   headers: { 'X-Custom-Header': 'foobar' }
// })

const http = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  timeout: 3000,
  transformResponse: [function (data) {
    try {
      return JSONbig.parse(data)
    } catch (err) {
      return data
    }
  }]
})

// 添加请求拦截器
http.interceptors.request.use((config) => {
  const userInfo = getUser()
  if (userInfo.token) {
    config.headers.Authorization = 'Bearer ' + userInfo.token
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

export default http
