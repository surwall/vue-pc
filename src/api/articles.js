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
/**
 * 添加文章
 * @param {Boolean} draft 是否为草稿
 * @param {Object} articleObj post body
 */
export const reqAddArticles = (draft, articleObj) => {
  return http({
    method: 'POST',
    url: 'mp/v1_0/articles',
    params: {
      draft
    },
    data: articleObj
  })
}
