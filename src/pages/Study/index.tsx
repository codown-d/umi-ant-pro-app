import { FooterToolbar, PageContainer } from '@ant-design/pro-components';
import { useLocation, useNavigate } from '@umijs/max';
import List from 'rc-virtual-list';
import React, { useEffect, useMemo, useState } from 'react';
import StudyFooter from './components/StudyFooter';
import './index.less';
import { StudyProvider } from './StudyContext';

enum pageTypeEmu {
  study = '/study',
  attendance = '/attendance',
}
const Study: React.FC<unknown> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let [data, setData] = useState([]);
  let [pageType] = useState(location.pathname);
  useEffect(() => {
    if (pageTypeEmu.attendance === pageType) {
    } else {
    }
  }, [pageType]);
  let title = useMemo(() => {
    if (pageTypeEmu.attendance === pageType) {
      return '值守模式';
    } else {
      return '学习模式';
    }
  }, [pageType]);

  return (
    <PageContainer
      header={{
        title,
        onBack: () => navigate(-1),
        style: {
          padding: 0,
          margin: 0,
        },
      }}
    >
      <StudyProvider>
        <List data={data} itemKey={'id'} height={200} itemHeight={30}>
          {(index) => <div key={index}>{index}</div>}
        </List>
        <FooterToolbar className={'study-footer'}>
          <StudyFooter />
        </FooterToolbar>
      </StudyProvider>
    </PageContainer>
  );
};

export default Study;
