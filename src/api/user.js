import request from '@/plugin/axios'

/**
 * 获取用户列表(分页)
 * @param params
 */
export function getUserPager (params) {
  return request({
    url: '/user',
    method: 'get',
    params
  })
}

/**
 * 创建用户
 * @param data
 */
export function createUser (data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

