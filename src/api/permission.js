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
