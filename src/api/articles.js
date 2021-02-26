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

/**
 * 根据 id 获取文章详情
 */
export const reqGetArticleById = (id) => {
  return http({
    method: 'get',
    url: `/mp/v1_0/articles/${id}`
  })
}

/**
 * 根据 id 保存修改文章详情
 */
export const reqEditArticle = (id, draft, data) => {
  return http({
    method: 'put',
    url: `/mp/v1_0/articles/${id}`,
    data,
    params: {
      draft
    }
  })
}
