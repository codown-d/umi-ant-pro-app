import { AppConfigContext } from '@/contexts/AppConfigContext';
import React, { useContext, useMemo } from 'react';
import './index.less';

interface Props {}
const WebInfo: React.FC<Props> = (props) => {
  const { webInfo } = useContext(AppConfigContext);
  let { host, hash, title } = useMemo(() => {
    return {
      title: webInfo?.title,
      url: webInfo?.url,
      hash: webInfo?.hash,
      host: webInfo?.host,
    };
  }, [webInfo]);
  return (
    <div
      className="flex-r-c web-info"
      style={{ width: '100%', height: '86px' }}
    >
      <div
        style={{ width: '108px', height: '100%' }}
        className="flex-c-c web-ico"
      >
        <img src="/images/web-ico.svg" alt="" />
        <span className="web-title">产品名称</span>
      </div>
      <div style={{ flex: 1 }} className="ml16">
        <div className="web-name">{title}</div>
        <div className="web-url mt2">URL: {host}</div>
        <div className="web-url web-path mt2">路径：{hash}</div>
      </div>
    </div>
  );
};

export default WebInfo;
