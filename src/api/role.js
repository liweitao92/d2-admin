import request from '@/plugin/axios'

/**
 * 获取角色列表(分页)
 * @param params
 */
export function getRolePager (params) {
  return request({
    url: '/role',
    method: 'get',
    params
  })
}

/**
 * 创建角色
 * @param data
 */
export function createRole (data) {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}

/**
 * 修改角色
 * @param data
 */
export function updateRole (data) {
  return request({
    url: `/role/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * 删除角色
 * @param id
 */
export function deleteRole (id) {
  return request({
    url: `/role/${id}`,
    method: 'delete'
  })
}
