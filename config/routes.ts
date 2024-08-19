export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '首页',
    path: '/home',
    component: './Home',
    meta: { customParam: 'customValue' },
  },
  {
    name: '设置',
    path: '/setting',
    component: './Setting',
  },
  {
    name: '权限演示',
    path: '/access',
    component: './Access',
  },
  {
    name: '学习模式',
    path: '/study',
    component: './Study',
  },
  {
    name: '值守模式',
    path: '/attendance',
    component: './Study',
  },
];
