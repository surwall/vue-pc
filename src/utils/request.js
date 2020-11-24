import axios from 'axios'

// const instance = axios.create({
//   baseURL: 'https://some-domain.com/api/',
//   timeout: 1000,
//   headers: { 'X-Custom-Header': 'foobar' }
// })

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  timeout: 3000
})

export default instance
