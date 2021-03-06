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
 * 根据 ID 获取用户
 * @param id
 * @returns {never}
 */
export function getUser (id) {
  return request({
    url: `/user/${id}`,
    method: 'get'
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

/**
 * 修改用户
 * @param data
 */
export function updateUser (data) {
  return request({
    url: `/user/${data.id}`,
    method: 'put',
    data
  })
}
