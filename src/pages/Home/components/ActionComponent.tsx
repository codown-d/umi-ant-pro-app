import { useNavigate } from '@umijs/max';
import { Button, Input, Select } from 'antd';
import React from 'react';
import styles from '../index.less';
const { Option } = Select;
const selectBefore = (
  <Select defaultValue="http://" className="select-before">
    <Option value="http://">http://</Option>
    <Option value="https://">https://</Option>
  </Select>
);
const ActionComponent : React.FC = () => {

  const navigate = useNavigate();
  return true ? (
    <>
      <Button
        className={`mb12 f16 mt40 ${styles.btn}`}
        onClick={() => {
          navigate('/study');
        }}
      >
        学习模式
      </Button>
      <Button
        className={`f16 ${styles.btn}`}
        onClick={() => {
          navigate('/attendance');
        }}
      >
        值守模式
      </Button>
    </>
  ) : !true ? (
    <div className={`f14 fw400 mt40 ${styles.tips}`}>
      未适配的产品无法进行学习或值守
    </div>
  ) : (
    <>
      <div className={`f14 fw400 mt40 ${styles.tips}`}>
        非数据抓取页面无法进行学习或值守
      </div>
      <Input
        addonBefore={selectBefore}
        defaultValue="mysite"
        className={`mt12 ${styles.select}`}
      />
      <Button className={`f16 mt12`}>设置为数据抓取页面</Button>
    </>
  );
}
export default ActionComponent;