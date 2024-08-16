import layoutBg from '@/assets/images/layout-bg.svg';
import logo from '@/assets/images/logo.svg';
import setting from '@/assets/images/setting.svg';
import wenti from '@/assets/images/wenti.svg';

import { ProLayout } from '@ant-design/pro-components';
import { memo } from 'react';
import AiContainer from './AiContainer';
import './index.less';

let LayoutActions = () => {
  return (
    <div style={{ marginRight: 16 }}>
      {[setting, wenti].map((item, index) => {
        return (
          <img
            key={index}
            src={item}
            style={{
              width: '20px',
              height: '20px',
              marginLeft: '12px',
              cursor: 'pointer',
            }}
          />
        );
      })}
    </div>
  );
};

const Layout = () => {
  return (
    <ProLayout
      prefixCls="tz"
      title={'智航智子护网辅助系统'}
      logo={logo}
      layout="top"
      actionsRender={LayoutActions}
      fixedHeader={true}
      token={{
        bgLayout: `url(${layoutBg}) no-repeat center center`,
        header: {
          heightLayoutHeader: 48,
          colorBgHeader: 'transparent',
        },
      }}
      contentStyle={{ padding: '16px 20px', height: 'calc(100vh - 48px)' }}
    >
      <AiContainer />
    </ProLayout>
  );
};
export default memo(Layout);
