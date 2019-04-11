import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/system',
  name: 'system',
  meta: {
    auth: true
  },
  redirect: { name: 'system-index' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'index',
      name: `${pre}index`,
      component: _import('framework/system/index'),
      meta: {
        ...meta,
        title: '系统管理首页'
      }
    },
    {
      path: 'menu',
      name: `${pre}menu`,
      component: _import('framework/system/menu'),
      meta: {
        ...meta,
        title: '菜单管理'
      }
    },
    {
      path: 'user',
      name: `${pre}user`,
      component: _import('framework/system/user'),
      meta: {
        ...meta,
        title: '用户管理'
      }
    },
    {
      path: 'role',
      name: `${pre}role`,
      component: _import('framework/system/role'),
      meta: {
        ...meta,
        title: '角色管理'
      }
    },
    {
      path: 'permission',
      name: `${pre}permission`,
      component: _import('framework/system/permission'),
      meta: {
        ...meta,
        title: '权限管理'
      }
    }
  ])('system-')
}
