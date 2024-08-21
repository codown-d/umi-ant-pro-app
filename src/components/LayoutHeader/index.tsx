import React, { useCallback, useState } from 'react';
import styles from './index.less';
import logo from '@/assets/images/logo.svg';
import { Drawer } from 'antd';
import Title from '../Title';
import { history } from '@umijs/max';
import setting from '@/assets/images/setting.svg';
import wenti from '@/assets/images/wenti.svg';

interface Props {
    className?:string;
    children?:React.ReactNode
}
let LayoutActions = () => {
    const [open, setOpen] = useState(false);
    const [viewportHeight] = useState(window.innerHeight);
    let onHandle = useCallback((type: string) => {
      if (type == 'wenti') {
        setOpen(true);
      } else {
        history.push('/setting');
      }
    }, []);
    let onClose = useCallback(() => {
      setOpen(false);
    }, []);
    let list = [
      { type: 'setting', src: setting },
      { type: 'wenti', src: wenti },
    ];
    return (
      <>
        <div style={{ marginRight: 16 }}>
          {list.map((item) => {
            let { type, src } = item;
            return (
              <img
                key={type}
                src={src}
                style={{
                  width: '20px',
                  height: '20px',
                  marginLeft: '12px',
                  cursor: 'pointer',
                }}
                onClick={() => onHandle(type)}
              />
            );
          })}
        </div>
        <Drawer
          title={<span className="f18">帮助中心</span>}
          placement={'bottom'}
          closable={false}
          extra={
            <span onClick={onClose} className="cursor-p">
              <i className={'icon iconfont icon-close'}></i>
            </span>
          }
          onClose={onClose}
          height={viewportHeight / 2}
          open={open}
          key={'help_center'}
        >
          <p className="f12">
            智航智子护网辅助系统是一款先进的网络安全解决方案，专为保护数字资产和敏感数据而设计。系统结合了人工智能与尖端技术，提供全面的网络防护，确保企业始终处于安全状态。
          </p>
          <Title title={'主要功能'} className="mb6 mt16" />
          <p className="f12">
            实时监控预警：通过AI算法实时分析网络流量，快速识别和响应潜在威胁。
            <br />
            用户行为分析：利用大数据分析技术，监控用户行为，识别异常活动，防范内部威胁。
            <br />
            自动化漏洞修复：智能检测系统漏洞，自动部署补丁，提高漏洞修复效率。
            <br />
            多层次防护措施：集成防火墙、入侵检测、恶意软件防护等多重安全措施，构建牢不可破的安全屏障。
            <br />
            定制化安全策略：根据企业需求量身定制安全策略，提供个性化保护方案。
          </p>
          <Title title={'联系我们'} className="mb4 mt16" />
          <div
            className="flex-r-c mb16"
            style={{ justifyContent: 'space-between' }}
          >
            <div className="flex-c-c" style={{ alignItems: 'flex-start' }}>
              <span>info@tensorsecurity.cn</span>
              <span className="mt8">400-133-0580</span>
            </div>
            <img src="/images/QR_code.svg" alt="" style={{ width: '80px' }} />
          </div>
        </Drawer>
      </>
    );
  };
const LayoutHeader: React.FC<Props> = (props) => {
    const {className} = props;
    let Header=React.memo(()=>{
        return props?.children||<div className='flex-r-c' style={{justifyContent:'space-between'}}>
            <div>
                 <img src={logo} alt="" className='mr8'/><span className={styles.title}>智航智子护网辅助系统</span>
            </div>
        <LayoutActions/>
        </div>
    })
    return <div className={`${className} ${styles.layout_header}`}>
       <Header/>
    </div>
};

export default LayoutHeader;
