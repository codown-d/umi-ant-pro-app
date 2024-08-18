import layoutBg from '@/assets/images/layout-bg.svg';
import { ProLayout } from '@ant-design/pro-components';
import { ConfigProvider, Drawer } from 'antd';
import { memo, useCallback, useState } from 'react';
import AiContainer from './AiContainer';
import './index.less';
import PageHeader from '@/components/LayoutHeader';



const Layout = () => {
  return (
    <ProLayout
      prefixCls="tz"
      headerRender={()=><PageHeader/>}
      fixedHeader={true}
      menuRender={false}
      layout={'top'}
      token={{
        bgLayout: `url(${layoutBg}) no-repeat center center`,
        header: {
          heightLayoutHeader: 48,
          colorBgHeader: 'transparent',
        },
      }}
      contentStyle={{ padding: '16px 20px', height: 'calc(100vh - 48px)' }}
    >
      <ConfigProvider
        theme={{
          components: {
            Button: {
              borderRadius: 8,
              controlHeight: 36,
              paddingInline: 20,
              defaultColor: '#2177D1',
            },
            Input: {
              paddingBlock: 7,
              algorithm: true,
            },
          },
          token: {},
        }}
      >
        <AiContainer />
      </ConfigProvider>
    </ProLayout>
  );
};
export default memo(Layout);
