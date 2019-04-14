import request from '@/plugin/axios'

/**
 * 获取权限列表
 * @param params
 */
export function getPermissionPager (params) {
  return request({
    url: '/permission',
    method: 'get',
    params
  })
}

/**
 * 创建权限信息
 * @param data
 * @returns {never}
 */
export function createPermission (data) {
  return request({
    url: '/permission',
    method: 'post',
    data
  })
}

/**
 * 修改权限信息
 * @param data
 * @returns {never}
 */
export function updatePermission (data) {
  return request({
    url: `/permission/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * 删除权限
 * @param id
 * @returns {never}
 */
export function deletePermission (id) {
  return request({
    url: `/permission/${id}`,
    method: 'delete'
  })
}

/**
 * 根据 id 获取
 * @param id
 * @returns {never}
 */
export function getPermission (id) {
  return request({
    url: `/permission/${id}`,
    method: 'get'
  })
}
