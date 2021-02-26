/**
 * 粉丝模块
 */
import http from '@/utils/request'

export const reqGetFans = (page, per_page) => {
  return http({
    url: '/mp/v1_0/followers',
    method: 'get',
    params: {
      page,
      per_page
    }
  })
}

export const reqGetFansStatistics = () => {
  return http({
    method: 'get',
    url: '/mp/v1_0/statistics/followers'
  })
}
