import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './index.less';
import storage from '@/utils/storage';

interface Props { }
const WebInfo: React.FC<Props> = (props) => {
  const [info, setInfo] = useState<{
    protocol: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    hash: string;
    title: string;
  }>();
  let handleWebInfo = useCallback((webInfo) => {
    storage.save({ webInfo })
    setInfo({ ...webInfo })
  }, [])
  let shouldListen=useRef(true)
  useEffect(() => {
    if (shouldListen.current) {
      shouldListen.current=false
      chrome.runtime?.onMessage.addListener((request, sender, sendResponse) => {
        if (request.type === 'FROM_CONTENT_WEBINFO') {
          let webInfo = JSON.parse(request.msg)
          console.log(webInfo)
          handleWebInfo(webInfo)
          sendResponse('')
        }
      });
    }
    storage?.get('webInfo').then(res => {
      setInfo(res?.webInfo)
    })
    return ()=>{
      shouldListen.current=false
    }
  }, [])

  let { url, hash, title } = useMemo(() => {
    return {
      url: `${info?.protocol}//${info?.hostname}${info?.pathname}`,
      hash: info?.hash,
      title: info?.title,
    };
  }, [info]);
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
        <div className="web-url mt2">URL: {url}</div>
        <div className="web-url web-path mt2">路径：{hash}</div>
      </div>
    </div>
  );
};

export default WebInfo;
