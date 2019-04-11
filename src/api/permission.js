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
