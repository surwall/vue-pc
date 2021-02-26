/**
 * 评论模块
 */
import http from '@/utils/request'

/**
 * 获取评论管理的列表数据
 * @param {*} page 当前页，默认值1
 * @param {*} per_page 每页数据，默认10条
 */
export const reqGetComments = (page, per_page) => {
  return http({
    url: '/mp/v1_0/articles',
    params: {
      page,
      per_page,
      response_type: 'comment'
    }
  })
}

/**
 * 打开或者关闭评论
 * @param {*} id 文章编号
 * @param {boolean} allow_comment 是否关闭
 */
export const modCommentStatus = (id, allow_comment) => {
  return http({
    method: 'put',
    url: '/mp/v1_0/comments/status',
    params: {
      article_id: id
    },
    data: {
      allow_comment
    }
  })
}
