import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Input, Table, Tag,  message } from "antd";
import "./App.less";
import moment from "moment";
import Draggable from "react-draggable";
import { requestStorage, sendMessage } from "./lib";
import { useDebounceFn } from "ahooks";
import TzTooltip from "./components/tz-tooltip";
let expiredType: any = {
  valid: { color: "#52C41A", text: "有效" },
  invalid: { color: "#E95454", text: "无效" },
};
let Title = (props: { title: any; className?: any }) => {
  let { title, className } = props;
  return <div className={`aisoc-title ${className}`}>{title}</div>;
};

const App: React.FC = () => {
  const [showIcon, setShowIcon] = useState(false);
  const [iconStyle, setIconStyle] = useState({ left: 0, top: 0 });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStyle, setModalStyle] = useState({ left: 0, top: 0 });

  let [dataInfo, setDataInfo] = useState();
  let selectedTextRef = useRef("");

  const items = useMemo(() => {
    let tagsClasses = dataInfo?.tagsClasses ? dataInfo?.tagsClasses : [];
    let judgments = dataInfo?.judgments ? dataInfo?.judgments : [];
    return [
      {
        key: "1",
        label: "情报标签",
        children: tagsClasses
          .filter((item) => !!item.tags)
          .map((item, index) => {
            return (
              <Tag color="#E95454" key={index} className="mt2 mb2">
                {item.tags}
              </Tag>
            );
          }),
      },
      {
        key: "2",
        label: "威胁类型",
        children: judgments
          .filter((item) => !!item)
          .map((item, index) => {
            return (
              <Tag color="#E95454" key={index} className="mt2 mb2">
                {item}
              </Tag>
            );
          }),
      },
      {
        key: "3",
        label: "应用场景",
        children: dataInfo?.scene || "-",
      },
      {
        key: "4",
        label: "反查域名",
        children: dataInfo?.sumCurDomains || "-",
      },
      {
        key: "5",
        label: "ANS",
        children: `${dataInfo?.asn.number || ""} ${dataInfo?.asn.name || ""}`,
      },
    ];
  }, [dataInfo]);
  let listInfo = useMemo(() => {
    return [
      {
        key: "1",
        num: dataInfo?.onlineIntelligences.length,
        label: "在线情报",
      },
      {
        key: "2",
        num: dataInfo?.ossIntelligences.length,
        label: "开源情报",
      },
      {
        key: "3",
        num: dataInfo?.ports?.length,
        label: "开放端口",
      },
      {
        key: "4",
        num: dataInfo?.rdnses?.length,
        label: "rDNS 记录",
      },
      {
        key: "5",
        num: dataInfo?.samples?.length,
        label: "相关样本",
      },
      {
        key: "6",
        num: dataInfo?.cas?.length,
        label: "SSL 相关证书",
      },
    ];
  }, [dataInfo]);

  let onlineIntCol = [
    {
      title: "情报来源",
      dataIndex: "source",
    },
    {
      title: "发现时间",
      dataIndex: "findTime",
      width: 110,
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      width: 110,
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "可信度评分",
      dataIndex: "confidence",
    },
    {
      title: "有效性",
      dataIndex: "expired",
      render: (item) => {
        let f = item ? "valid" : "invalid";
        let { color, text } = expiredType[f];
        return <span style={{ color: color }}>{text}</span>;
      },
    },
    {
      title: "威胁类型",
      dataIndex: "intelTypes",
      render: (intelTypes) => {
        return (
          <div>
            {intelTypes?.map((item, index) => (
              <Tag color="#E95454" key={index} className="mt2 mb2">
                {item}
              </Tag>
            ))}
          </div>
        );
      },
    },
    {
      title: "情报标签",
      dataIndex: "intelTags",
      render: (intelTags) => {
        return (
          <div>
            {intelTags?.map((item, index) => (
              <Tag color="#E95454" key={index} className="mt2 mb2">
                {item?.tags}
              </Tag>
            ))}
          </div>
        );
      },
    },
  ];
  let openPortCol = [
    {
      title: "端口号",
      dataIndex: "port",
    },
    {
      title: "应用协议",
      dataIndex: "module",
    },
    {
      title: "应用名称",
      dataIndex: "product",
    },
    {
      title: "应用版本",
      dataIndex: "version",
    },
    {
      title: "应用详情",
      dataIndex: "detail",
    },
  ];

  let relatedSamplesCol = [
    {
      title: "文件 hash",
      dataIndex: "hash",
    },
    {
      title: "检测时间",
      dataIndex: "scanTime",
      width: 110,
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "检出率",
      dataIndex: "ratio",
    },
    {
      title: "恶意类型",
      dataIndex: "malwareType",
      render: (text = "基础设施") => <Tag color="#E95454">{text}</Tag>,
    },
    {
      title: "恶意家族",
      dataIndex: "malwareFamily",
    },
  ];
  let sslCertCol = [
    {
      title: "协议",
      dataIndex: "protocol",
    },
    {
      title: "端口信息",
      dataIndex: "port",
    },
    {
      title: "使用日期",
      dataIndex: "period",
      width: "30%",
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "证书详情",
      dataIndex: "digitalCertificate",
      width: "40%",
      render: (text) => text?.purpose || text?.subject,
    },
  ];
  const isValidIP = useCallback((ip) => {
    const ipRegex =
      /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$/;
    const ipRegexIpv6 =
      /^(?:[0-9a-fA-F]{1,4}:){7}(?:[0-9a-fA-F]{1,4}|:)$|^(?:[0-9a-fA-F]{1,4}:){1,7}:$|^(?:[0-9a-fA-F]{1,4}:){1,6}:(?:[0-9a-fA-F]{1,4}|:)$|^(?:[0-9a-fA-F]{1,4}:){1,5}:(?:[0-9a-fA-F]{1,4}:){1,2}(?:[0-9a-fA-F]{1,4}|:)$|^(?:[0-9a-fA-F]{1,4}:){1,4}:(?:[0-9a-fA-F]{1,4}:){1,3}(?:[0-9a-fA-F]{1,4}|:)$|^(?:[0-9a-fA-F]{1,4}:){1,3}:(?:[0-9a-fA-F]{1,4}:){1,4}(?:[0-9a-fA-F]{1,4}|:)$|^(?:[0-9a-fA-F]{1,4}:){1,2}:(?:[0-9a-fA-F]{1,4}:){1,5}(?:[0-9a-fA-F]{1,4}|:)$|^:(?:[0-9a-fA-F]{1,4}:){1,6}(?:[0-9a-fA-F]{1,4}|:)$|^::(?:[0-9a-fA-F]{1,4}:){1,7}$|^(?:[0-9a-fA-F]{1,4}:){1,6}::$|^(?:[0-9a-fA-F]{1,4}:){1,5}::(?:[0-9a-fA-F]{1,4}|:)$|^(?:[0-9a-fA-F]{1,4}:){1,4}::(?:[0-9a-fA-F]{1,4}:){1,2}(?:[0-9a-fA-F]{1,4}|:)$|^(?:[0-9a-fA-F]{1,4}:){1,3}::(?:[0-9a-fA-F]{1,4}:){1,3}(?:[0-9a-fA-F]{1,4}|:)$|^(?:[0-9a-fA-F]{1,4}:){1,2}::(?:[0-9a-fA-F]{1,4}:){1,4}(?:[0-9a-fA-F]{1,4}|:)$|^::(?:[0-9a-fA-F]{1,4}:){1,5}(?:[0-9a-fA-F]{1,4}|:)$|^(?:[0-9a-fA-F]{1,4}:){1,7}::$|^(?:[0-9a-fA-F]{1,4}:){1,4}:(?:[0-9a-fA-F]{1,4}:)?[0-9a-fA-F]{1,4}$|^(?:[0-9a-fA-F]{1,4}:){1,3}:(?:[0-9a-fA-F]{1,4}:)?[0-9a-fA-F]{1,4}$|^(?:[0-9a-fA-F]{1,4}:){1,2}:(?:[0-9a-fA-F]{1,4}:)?[0-9a-fA-F]{1,4}$|^:(?:[0-9a-fA-F]{1,4}:)?[0-9a-fA-F]{1,4}$|^(?:[0-9a-fA-F]{1,4}:)?[0-9a-fA-F]{1,4}$/;

    return ipRegex.test(ip) || ipRegexIpv6.test(ip);
  }, []);
  let { run } = useDebounceFn(
    (event) => {
      if (event.source !== window) return;
      let type = event.data.type;
      if (type === "FROM_CONTENT_IP") {
        let msg = event.data.msg;
        if (!msg) {
          console.log(123456, message)
          message.warning("IP信息获取失败");
        } else {
          console.log(iconStyle);
          setModalOpen(true);
          setModalStyle({ ...iconStyle, left: iconStyle.left + 30 });
          setDataInfo(event.data.msg);
          setShowIcon(false);
        }
      }
    }, {
    wait: 500,
  },);
  useEffect(() => {
    window.addEventListener("message", run);
  }, [run]);
  useEffect(() => {
    function mouseup() {
      setTimeout(() => {
        try {
          setShowIcon(false);
          const selection = window.getSelection();
          const selectedText = selection.toString().trim();
          if (selection.rangeCount > 0 && selectedText && isValidIP(selectedText)) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            setIconStyle({ left: rect.left + rect.width, top: rect.top - 40 });
            requestStorage('settingInfo', (setInfo) => {
              console.log(setInfo)
              if (!setInfo.enable) return;
              setShowIcon(true);
              selectedTextRef.current = selectedText;
            })
          }
        } catch (e) {
          setShowIcon(false);
          console.log('e',e);
        }
       
      }, 0)
    }
    window.addEventListener("mouseup", mouseup);
    return () => {
      window.removeEventListener("mouseup", mouseup);
    };
  }, []);

  let getImgUrl = useMemo(() => {
    let url = dataInfo?.isMalicious ? "images/ey.svg" : "images/fey.svg";
    if (import.meta.env.MODE === "development") {
      return url;
    } else {
      return chrome.runtime.getURL(url);
    }
  }, [dataInfo]);
  let iconImgUrl = useMemo(() => {
    let url = "images/icon.svg";
    return import.meta.env.MODE === "development"
      ? url
      : chrome.runtime.getURL(url);
  }, []);

  return (
    <>
      {showIcon ? (
        <TzTooltip title={'查询威胁情报'} placement={'top'}>
          <img
            src={iconImgUrl}
            width={30}
            onMouseDown={() => {
              const selection = window.getSelection();
              selection.removeAllRanges();
              sendMessage(selectedTextRef.current, "FROM_PAGE_IP");
            }}
            style={{
              position: "fixed",
              left: iconStyle.left,
              top: iconStyle.top,
              zIndex: 9999,
            }}
          /></TzTooltip>
      ) : null}
      <Draggable handle=".drag-handler">
        <div
          className={"aisoc-modal tz-aisoc"}
          style={{
            left: `${modalStyle.left}px`,
            top: `${modalStyle.top}px`,
            width: `700px`,
            opacity: `${modalOpen ? 1 : 0}`,
            zIndex: `${modalOpen ? 9999 : -9999}`,
          }}
        >
          <div className="drag-handler">
            <span
              className="flex-r-c f18"
              style={{
                justifyContent: "space-between",
                cursor: "move",
                fontWeight: 550,
                color: "#3E4653",
                padding: "16px 0",
              }}
            >
              威胁情报
              <div className="flex-r-c">
                <Input
                  placeholder="搜索"
                  style={{
                    width: "200px",
                    marginRight: "10px",
                    display: "none",
                  }}
                  size="small"
                  prefix={
                    <i
                      className="iconfont icon-sousuo"
                      style={{ fontWeight: 400, fontSize: 12 }}
                    ></i>
                  }
                />
                <i
                  className="iconfont icon-close f24"
                  onClick={() => setModalOpen(false)}
                  style={{
                    color: "rgb(108, 116, 128)",
                    fontWeight: 300,
                    cursor: "pointer",
                  }}
                ></i>
              </div>
            </span>
          </div>
          <div className="ip-modal">
            <div className="flex-r-c">
              <img
                src={getImgUrl}
                className="ip-img"
                style={{ width: "72px", height: "72px" }}
              />
              <div className="ml16">
                <div className="flex-r-c" style={{ flexWrap: "wrap" }}>
                  <span className={"ip mr40 f24"}>{dataInfo?.ip}</span>
                  <span className="mr40 flex-r-c mr40">
                    <i className="iconfont icon-weizhi mr4 f12"></i>
                    {[
                      dataInfo?.location.country,
                      dataInfo?.location.province,
                      dataInfo?.location.city,
                    ]
                      .filter((item) => !!item)
                      .join("/")}
                  </span>
                  <span className="mr40">
                    <i className="iconfont icon-a-yunyingshang2 mr4 f12"></i>
                    {`${dataInfo?.carrier || ""}`}
                  </span>
                </div>
                <div className="flex-r-c f12" style={{ flexWrap: "wrap" }}>
                  {items.slice(0, 2).map((item, index) => {
                    return (
                      <div key={index} className="mb8">
                        <span style={{ color: "#6C7480" }}>{item.label}：</span>
                        <span>{item.children}</span>
                      </div>
                    );
                  })}
                  {items.slice(2).map((item, index) => {
                    return (
                      <div key={index + 2} className="mr40 mb8">
                        <span style={{ color: "#6C7480" }}>{item.label}：</span>
                        <span>{item.children}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex-r-c aisoc-wrap">
              {listInfo.map((item, index) => {
                return (
                  <div key={index} className="aisoc-item flex-c-c">
                    <span>{item.num}</span>
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ maxHeight: 500, overflow: "auto" }}>
              <Title title={"在线情报"} className={"mb6 mt16"} />
              <Table
                columns={onlineIntCol}
                dataSource={dataInfo?.onlineIntelligences}
                size={"small"}
                pagination={false}
              />
              <Title title={"开源情报"} className={"mb6 mt16"} />
              <Table
                columns={onlineIntCol}
                dataSource={dataInfo?.oSSIntelligences}
                size={"small"}
                pagination={false}
              />
              <Title title={"开放端口"} className={"mb6 mt16"} />
              <Table
                columns={openPortCol}
                dataSource={dataInfo?.ports}
                size={"small"}
                pagination={false}
              />
              <Title title={"相关样本"} className={"mb6 mt16"} />
              <Table
                columns={relatedSamplesCol}
                dataSource={dataInfo?.samples}
                size={"small"}
                pagination={false}
              />
              <Title title={"rDNS 记录"} className={"mb6 mt16"} />
              <div>
                {dataInfo?.rdnses?.map((item, index) => {
                  return (
                    <Tag color="#2177D1" key={index} className="mt2 mb2">
                      {item.rdns}
                    </Tag>
                  );
                })}
              </div>
              <Title title={"相关样本"} className={"mb6 mt16"} />
              <Table
                columns={sslCertCol}
                dataSource={dataInfo?.cas}
                size={"small"}
                pagination={false}
              />
            </div>
          </div>
        </div>
      </Draggable>
    </>
  );
};

export default App;
