import { Button } from 'antd';
import React from 'react';

interface UpdateFormProps {
  updateModalVisible: boolean;
}

const StudyFooter: React.FC<any> = (props) => {
  return (
    <div
      className="flex-c-c pb30"
      key={'submit'}
      style={{ lineHeight: 'normal' }}
    >
      <div className="f14 mt24">非数据抓取页面无法进行学习</div>
      <Button type="primary" className="mt24" style={{ width: '100%' }}>
        结束学习
      </Button>
      <div className="mt24 flex-r-c" style={{ width: '100%' }}>
        <Button className="mr10" style={{ flex: 1 }}>
          重新学习
        </Button>
        <Button className="ml10" type="primary" style={{ flex: 1 }}>
          保存
        </Button>
      </div>
    </div>
  );
};

export default StudyFooter;
