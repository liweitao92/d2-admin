export default {
  path: '/system',
  title: '系统管理',
  icon: 'flask',
  children: (pre => [
    { path: `${pre}index`, title: '系统管理', icon: 'home' },
    {
      title: '用户管理',
      icon: 'table',
      path: `${pre}user`
    },
    {
      title: '角色管理',
      icon: 'github',
      path: `${pre}role`
    },
    {
      title: '综合设置',
      icon: 'github',
      path: `${pre}issues/142`
    },
    {
      title: '菜单管理',
      icon: 'github',
      path: `${pre}menu`
    },
    {
      title: '权限管理',
      icon: 'github',
      path: `${pre}permission`
    }
  ])('/system/')
}
