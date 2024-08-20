export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: 'home',
    title: '首页', // 设置页面标题
    path: '/home',
    component: './Home',
    meta: { customParam: 'customValue' },
  },
  {
    name: 'setting',
    title: '设置', // 设置页面标题
    path: '/setting',
    component: './Setting',
  },
  {
    name: 'access',
    title: '权限演示', // 设置页面标题
    path: '/access',
    component: './Access',
  },
  {
    name: 'study',
    title: '学习模式', // 设置页面标题
    path: '/study',
    component: './Study',
  },
  {
    name: 'attendance',
    title: '值守模式', // 设置页面标题
    path: '/attendance',
    component: './Study',
  },
];
