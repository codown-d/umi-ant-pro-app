import { Outlet, useAppData, useLocation } from '@umijs/max';
import { ReactElement, memo, useState } from 'react';

const TzPageLayout = (props: any): ReactElement | null => {
  const location = useLocation();
  const AppData = useAppData();
  const { routes } = AppData;
  let [pageType] = useState(location.pathname);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default memo(TzPageLayout);
