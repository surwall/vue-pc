import http from '@/utils/request.js'

export const reqGetArticles = (queryObj) => {
  return http({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params: queryObj || {}
  })
}

export const reqGetChannels = () => {
  return http({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}

export const reqDelArticles = (articleId) => {
  return http({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${articleId}`
  })
}
