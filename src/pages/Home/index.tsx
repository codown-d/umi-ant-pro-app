import WebInfo from '@/components/WebInfo';
import { useAccess, useModel } from '@umijs/max';
import { Button, Input, Select } from 'antd';
import styles from './index.less';
import React from 'react';
const { Option } = Select;

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  const selectBefore = (
    <Select defaultValue="http://" className="select-before">
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );
  const ActionComponent = React.memo((props) => {
    const access = useAccess();
    return access.canSeeAdmin ? <>
      <Button className={`mb12 f16 mt40 ${styles.btn}`} onClick={() => { }}>学习模式</Button>
      <Button className={`f16 ${styles.btn}`}>值守模式</Button>
    </> :
    !access.canSeeAdmin ?
      <div className={`f14 fw400 mt40 ${styles.tips}`}>未适配的产品无法进行学习或值守</div>:
      <>
      <div className={`f14 fw400 mt40 ${styles.tips}`}>非数据抓取页面无法进行学习或值守</div>
      <Input addonBefore={selectBefore} defaultValue="mysite" className={`mt12 ${styles.select}`}/>
      <Button className={`f16 mt12`}>设置为数据抓取页面</Button>
      </>
  });
  return (
    <div className={styles.container}>
      <WebInfo name={''} />
      <div className="flex-c-c mt32">
        <img src="/assets/ai.svg" alt="" style={{ width: '100px' }} />
        <div className={`mb4 f16 ${styles.model}`}>模型 - 38 版本 20240726</div>
        <div className={`mb4 f12 ${styles.time}`}>2024-07-26 04:00:00</div>
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
