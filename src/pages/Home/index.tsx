import WebInfo from '@/components/WebInfo';
import { useAccess, useModel, useNavigate } from '@umijs/max';
import { Button, Input, Select } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment'
import styles from './index.less';
import ActionComponent from './components/ActionComponent';
import { getModelInfo } from '@/services';


const HomePage: React.FC = () => {
  let [modelInfo, setModelInfo] = useState<any>()
  let getModelInfoFn = useCallback(() => {
    getModelInfo().then(res => {
      setModelInfo(res.data)
    })
  }, [])
  useEffect(() => {
    getModelInfoFn()
  }, [getModelInfoFn]);
  return (
    <div className={styles.container}>
      <WebInfo />
      <div className="flex-c-c mt32">
        <img src="/images/ai.svg" alt="" style={{ width: '100px' }} />
        <div className={`mb4 f16 ${styles.model}`}>模型 - {modelInfo?.version}版本 {modelInfo?.time}</div>
        <div className={`mb4 f12 ${styles.time}`}>{moment().format('YYYY-MM-DD HH:mm:ss')}</div>
        <div className={`mb4 f12 ${styles.desc}`}>
          模型描述模型描述模型描述模型描述模型描述模型描述模型描述模型描述模型描述模型描述模型描述模型描述模型描述模型描述模型描述模型描述模型描述模型描述模型描述模型描述模型描述模型描述模型描述模型描述模型描述模型描述模型描述模型描述模型描述模型描述模型描述模型描述模型描述模型描述模型描述模型描述模型描述模型描述模型描述模型描述
        </div>
        <div
          className={`flex-r-c mt12 ${styles['study-cont']}`}
          style={{ justifyContent: 'space-around' }}
        >
          <div style={{ flex: 1 }} className="flex-c-c">
            <div className="f14">2024-07-26 04:31:40</div>
            <div className="f12">最近学习时间</div>
          </div>
          <div style={{ flex: 1 }} className="flex-c-c">
            <div className="f14">1h 20min 30s</div>
            <div className="f12">最近学习时长</div>
          </div>
        </div>
        <ActionComponent />
      </div>
    </div>
  );
};

export default HomePage;
