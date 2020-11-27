import http from '@/utils/request.js'

export const reqGetArticles = (queryObj) => {
  return http({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params: queryObj || {}
  })
}
