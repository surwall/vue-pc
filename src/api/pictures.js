import http from '../utils/request'

// 获取素材列表
// collect 是否收藏

export const reqGetImages = (paramObj) => {
  return http({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params: paramObj || {}
  })
}

export const reqSwitchCollect = (id, collect) => {
  return http({
    method: 'PUT',
    url: `/mp/v1_0/user/images/${id}`,
    data: {
      collect
    }
  })
}

export const reqDelImage = (id) => {
  return http({
    method: 'DELETE',
    url: `/mp/v1_0/user/images/${id}`
  })
}
