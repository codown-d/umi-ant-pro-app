import WebInfo from '@/components/WebInfo';
import { getSystemInfo } from '@/services';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import ActionComponent from './components/ActionComponent';
import styles from './index.less';

const HomePage: React.FC = () => {
  let [modelInfo, setModelInfo] = useState<any>();
  let getModelInfoFn = useCallback(() => {
    getSystemInfo().then((res) => {
      console.log(res);
      setModelInfo(res.data);
    });
  }, []);
  useEffect(() => {
    getModelInfoFn();
  }, [getModelInfoFn]);
  return (
    <div className={styles.container}>
      <WebInfo />
      <div className="flex-c-c mt32">
        <img src="/images/ai.svg" alt="" style={{ width: '100px' }} />
        <div className={`mb4 f16 ${styles.model}`}>{modelInfo?.model}</div>
        <div className={`mb4 f12 ${styles.time}`}>
          {moment().format('YYYY-MM-DD HH:mm:ss')}
        </div>
        <div className={`mb4 f12 ${styles.desc}`}>{modelInfo?.description}</div>
        <div
          className={`flex-r-c mt12 ${styles['study-cont']}`}
          style={{ justifyContent: 'space-around' }}
        >
          <div style={{ flex: 1 }} className="flex-c-c">
            <div className="f14">
              {moment(modelInfo?.latestLearning).format('YYYY-MM-DD HH:mm:ss')}
            </div>
            <div className="f12">最近学习时间</div>
          </div>
          <div style={{ flex: 1 }} className="flex-c-c">
            <div className="f14">{modelInfo?.learningPeriod}</div>
            <div className="f12">最近学习时长</div>
          </div>
        </div>
        <ActionComponent />
      </div>
    </div>
  );
};

export default HomePage;
