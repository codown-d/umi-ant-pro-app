import layoutBg from '@/assets/images/layout-bg.svg';
import PageHeader from '@/components/LayoutHeader';
import { ProLayout } from '@ant-design/pro-components';
import { ConfigProvider } from 'antd';
import { memo } from 'react';
import TzPageLayout from './TzPageLayout';
import './index.less';
import { AppConfigProvider } from '@/contexts/AppConfigContext';

const Layout = () => {
  return (
    <ProLayout
      prefixCls="tz"
      headerRender={() => <PageHeader />}
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
      contentStyle={{ padding: '16px 20px' }}
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
          token: {
            colorPrimary: '#2177D1',
          },
        }}
      >
        <AppConfigProvider>
          <TzPageLayout />
        </AppConfigProvider>
      </ConfigProvider>
    </ProLayout>
  );
};
export default memo(Layout);
