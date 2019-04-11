import request from '@/plugin/axios'

/**
 * 根据type和settingFor获取配置
 * @param params
 */
export function getAuthSetting (params) {
  return request({
    url: `/autz-setting/${params.type}/${params.id}`,
    method: 'get'
  })
}

/**
 * 创建用户权限
 * @param params
 * @returns {never}
 */
export function createAuthSetting (data) {
  return request({
    url: `/autz-setting/`,
    method: 'post',
    data
  })
}
