export default [
  {
    path: '/',
    title: '首页',
  }, {
    path: '/about',
    title: 'About',
  }, {
    path: '/users',
    title: '用户管理',
    children: [
      {
        path: '/',
        title: '列表',
      }, {
        path: 'user',
        title: '详情',
      },
    ],
  },
];
