import { useAppAccess } from '@/hooks';
import { Button } from 'antd';
import React from 'react';

const StudyFooter: React.FC<any> = (props) => {
  let access = useAppAccess();
  return (
    <div
      className="flex-c-c pb30"
      key={'submit'}
      style={{ lineHeight: 'normal' }}
    >
      {!access.page ? (
        <div className="f14 mt24" style={{ color: '#E95454' }}>
          非数据抓取页面无法进行学习
        </div>
      ) : null}
      <Button type="primary" className="mt24" style={{ width: '100%' }}>
        结束学习
      </Button>
      {access.page ? (
        <>
          <div className="mt24 flex-r-c" style={{ width: '100%' }}>
            <Button className="mr10" style={{ flex: 1 }}>
              重新学习
            </Button>
            <Button className="ml10" type="primary" style={{ flex: 1 }}>
              保存
            </Button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default StudyFooter;
