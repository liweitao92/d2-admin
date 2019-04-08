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
 * 删除角色
 * @param id
 */
export function deleteRole (id) {
  return request({
    url: `/role/${id}`,
    method: 'delete'
  })
}
