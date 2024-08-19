import { Outlet, useAppData, useLocation } from '@umijs/max';
import { ReactElement, memo, useState } from 'react';

const TzPageLayout = (props: any): ReactElement | null => {
  const location = useLocation();
  const AppData = useAppData();
  const { routes } = AppData;
  let [pageType] = useState(location.pathname);
  console.log(location, routes);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default memo(TzPageLayout);
