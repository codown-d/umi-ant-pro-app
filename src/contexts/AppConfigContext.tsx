import { getAppConfig } from '@/services';
import { parseUrl } from '@/utils';
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';

interface SysConfigProps {
  name: string;
  version: string;
  description: string;
}
interface WebInfoProps {
  url: string;
  title: string;
  host: string;
  hash?: string;
}
interface AppConfigType {
  sysConfig: SysConfigProps | undefined;
  webInfo: WebInfoProps | undefined;
}
const AppConfigContext = createContext<AppConfigType>(null!);

interface AppConfigProviderProps {
  children: ReactNode;
}
const AppConfigProvider: React.FC<AppConfigProviderProps> = ({ children }) => {
  const [sysConfig, setSysConfig] = useState<SysConfigProps>();
  const [webInfo, setWebInfo] = useState<WebInfoProps>();

  let fetchPermissions = useCallback(async () => {
    const response = await getAppConfig();
    setSysConfig(response.data);
  }, []);
  useEffect(() => {
    fetchPermissions();
  }, [fetchPermissions]);
  useEffect(() => {
    chrome.runtime?.onMessage.addListener((data, sender, sendResponse) => {
      console.log('initInfo', data);
      if (data.type === 'FROM_BACKGROUND_WEBINFO') {
        let info = data.msg;
        let { path, hash, origin } = parseUrl(info.url);
        setWebInfo({
          url: info.url,
          host: origin,
          title: info?.title,
          hash: hash || path,
        });
        sendResponse('ok');
      }
    });
    chrome.storage.session.get(['webinfo'], (result: any) => {
      let info = result.webinfo;
      let { path, hash, origin } = parseUrl(info.url);
      setWebInfo({
        url: info.url,
        host: origin,
        title: info?.title,
        hash: hash || path,
      });
    });
  }, []);
  return (
    <AppConfigContext.Provider value={{ sysConfig, webInfo }}>
      {children}
    </AppConfigContext.Provider>
  );
};

export { AppConfigContext, AppConfigProvider };
