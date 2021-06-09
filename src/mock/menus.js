export default [
  {
    path: '/',
    title: '首页',
  }, {
    path: '/about',
    title: 'About',
  }, {
    path: '/Froala',
    title: 'Froala编辑器',
  }, {
    path: '/Editor',
    title: 'Editor编辑器',
  }, {
    path: '/table',
    title: '表格',
  }, {
    path: '/users',
    title: '用户管理',
    children: [
      {
        path: '/',
        title: '列表',
      }, {
        path: 'add',
        title: '添加',
      },
    ],
  },
];
