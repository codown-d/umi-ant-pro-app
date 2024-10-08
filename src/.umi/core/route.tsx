// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import React from 'react';

export async function getRoutes() {
  const routes = {"1":{"path":"/","redirect":"/home","parentId":"@@/global-layout","id":"1"},"2":{"name":"home","title":"首页","path":"/home","meta":{"customParam":"customValue"},"parentId":"@@/global-layout","id":"2"},"3":{"name":"setting","title":"设置","path":"/setting","parentId":"@@/global-layout","id":"3"},"4":{"name":"access","title":"权限演示","path":"/access","parentId":"@@/global-layout","id":"4"},"5":{"name":"study","title":"学习模式","path":"/study","parentId":"@@/global-layout","id":"5"},"6":{"name":"attendance","title":"值守模式","path":"/attendance","parentId":"@@/global-layout","id":"6"},"@@/global-layout":{"id":"@@/global-layout","path":"/","isLayout":true}} as const;
  return {
    routes,
    routeComponents: {
'1': React.lazy(() => import('./EmptyRoute')),
'2': React.lazy(() => import(/* webpackChunkName: "p__Home__index" */'@/pages/Home/index.tsx')),
'3': React.lazy(() => import(/* webpackChunkName: "p__Setting__index" */'@/pages/Setting/index.tsx')),
'4': React.lazy(() => import(/* webpackChunkName: "p__Access__index" */'@/pages/Access/index.tsx')),
'5': React.lazy(() => import(/* webpackChunkName: "p__Study__index" */'@/pages/Study/index.tsx')),
'6': React.lazy(() => import(/* webpackChunkName: "p__Study__index" */'@/pages/Study/index.tsx')),
'@@/global-layout': React.lazy(() => import(/* webpackChunkName: "layouts__index" */'D:/workspace/react/umi-antd-pro-app/src/layouts/index.tsx')),
},
  };
}
