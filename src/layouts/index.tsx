import layoutBg from '@/assets/images/layout-bg.svg';
import { ProLayout } from '@ant-design/pro-components';
import { memo } from 'react';
import './index.less';
const Layout = (props) => {
  console.log(props);
  return (
    <ProLayout
      prefixCls="tz"
      title={'智航智子护网辅助系统'}
      token={{
        bgLayout: `url(${layoutBg}) no-repeat center center`,
      }}
      menuRender={() => false}
    >
      {props.children}
    </ProLayout>
  );
};
export default memo(Layout);
