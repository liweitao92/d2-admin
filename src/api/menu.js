import request from '@/plugin/axios'

/**
 * 获取菜单列表
 * @param params
 */
export function getMenuTree (params) {
  return request({
    url: '/menu/tree',
    method: 'get',
    params
  })
}

/**
 * 创建菜单
 * @param data
 * @returns {never}
 */
export function createMenu (data) {
  return request({
    url: '/menu',
    method: 'post',
    data
  })
}
