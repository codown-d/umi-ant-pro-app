import { AppConfigContext } from '@/contexts/AppConfigContext';
import { getProductList } from '@/services';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

type UseAppAccessReturn = { app: boolean; page: boolean };
export function useAppAccess(): UseAppAccessReturn {
  const { sysConfig, webInfo } = useContext(AppConfigContext);
  const [productList, setProductList] = useState([]);

  let access = useMemo(() => {
    let urlList = sysConfig?.product.map(
      (item) => `${item.protocol}://${item.pageUrl}`,
    );
    return {
      app: productList.some((item) => {
        return webInfo?.url.indexOf(item) != -1;
      }),
      page: urlList?.some((item) => {
        return item.indexOf(webInfo?.url) != -1;
      }),
    };
  }, [sysConfig, webInfo, productList]);

  let fetchPermissions = useCallback(async () => {
    const response = await getProductList();
    setProductList(response.data);
  }, []);
  useEffect(() => {
    fetchPermissions();
  }, []);
  useEffect(() => {
    console.log(sysConfig, webInfo, productList);
  }, [sysConfig, webInfo, productList]);

  return access;
}
