import { defineConfig } from '@umijs/max';
import routes from './routes';
const { PUBLIC_URL = '' } = process.env;
const links = [
  {
    href: `${PUBLIC_URL}/font/iconfont.css`,
    rel: 'stylesheet',
    type: 'text/css',
  },
  //   {
  //     href: `${PUBLIC_URL}/theme.css`,
  //     rel: 'stylesheet',
  //     type: 'text/css',
  //   },
];
export default defineConfig({
  links,
  alias: {
    '@': '/src',
  },
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  routes,
  npmClient: 'pnpm',
});
