import classNames from "classnames";
import styles from "./index.module.less";
import { useMemo } from "react";

const NoData = (props?: any) => {
  let { small, ...otherProps } = props || {};
  let getImgUrl = useMemo(() => {
    let url = "images/nodata.png";
    if (import.meta.env.MODE === "development") {
      return url;
    } else {
      return chrome.runtime.getURL(url);
    }
  }, []);
  return (
    <div {...otherProps} className={`${styles.nodata} ${props?.className}`}>
      <img
        src={getImgUrl}
        alt="NoData"
        className={classNames({
          small: props?.small,
        })}
      />
      <span>暂无数据</span>
    </div>
  );
};

export default NoData;
