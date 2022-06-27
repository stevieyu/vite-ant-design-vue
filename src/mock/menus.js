export const menus = [
  {
    path: '/orders',
    title: '订单',
  }, {
    path: '/products',
    title: '产品',
  },
  {
    path: '/users',
    title: '用户',
  },
  {
    path: '/amistree',
    title: '页面编辑',
  },
];

export default menus;

export const getMenus = (routes, children = menus, fpath = '') => {
  return children.map((i) => {
    let fullpath = fpath;
    if (fullpath) fullpath+= '/';
    fullpath+= i.path;
    fullpath = fullpath.replace('//', '/');

    const r = {};
    r.path = i.path;
    r.name = routes.find((ii) => ii.path === fullpath) || routes.find((ii) => ii.path.includes(fullpath));
    if (r.name) r.name = r.name.name;
    r.meta = {};
    r.meta.title = i.title;
    if (i.icon) r.meta.icon = i.icon;
    if (!i.icon) r.meta.icon = 'MenuOutlined';
    if (i.children && i.children.length) r.children = getMenus(routes, i.children, i.path);
    return r;
  });
};
