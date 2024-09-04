import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Input, Tag, message } from "antd";
import "./App.less";
import moment from "moment";
import Draggable from "react-draggable";
import { requestStorage, sendMessage } from "./lib";
import TzTooltip from "./components/tz-tooltip";
import NoData from "./components/no-data";
import TruncatedTextWithTooltip from "./components/TruncatedTextWithTooltip";
import TzTable from "./components/tz-table";
export interface Response {
  /**
   * asn信息
   */
  asn: Asn;
  /**
   * 运营商
   */
  carrier: string;
  /**
   * SSL相关证书信息
   */
  cas: Ca[];
  judgments: string[];
  /**
   * 位置信息
   */
  location: Location;
  /**
   * 在线情报
   */
  onlineIntelligences: OnlineIntelligence[];
  /**
   * 开源情报
   */
  ossIntelligences: OssIntelligence[];
  /**
   * 开放端口
   */
  ports: Port[];
  /**
   * rdns
   */
  rdnses: Rdnse[];
  /**
   * 相关样本
   */
  samples: Sample[];
  /**
   * 场景
   */
  scene: string;
  /**
   * 反查当前域名数量
   */
  sumCurDomains: number;
  /**
   * 相关攻击团伙或安全事件信息
   */
  tagsClasses: TagsClass[];
  [property: string]: any;
}

/**
 * asn信息
 */
export interface Asn {
  Company: string;
  info: string;
  name: string;
  number: number;
  region: string;
  riskRank: number;
  [property: string]: any;
}

export interface Ca {
  digitalCertificate?: string;
  period?: number;
  port?: number;
  protocol?: string;
  [property: string]: any;
}

/**
 * 位置信息
 */
export interface Location {
  city: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  province: string;
  [property: string]: any;
}

export interface OnlineIntelligence {
  confidence?: number;
  expired?: boolean;
  findTime?: string;
  /**
   *
   * 该条情报的标签信息，包含相关攻击团伙或该条情报的标签信息，包含相关攻击团伙该条情报的标签信或安全事件等该条情报的标签信息，包含相关攻击团伙或该条情报的标签信息，包含相关攻击团伙该条情报的标签信或安全事件等安全事件等安全事件等
   */
  intelTags?: OnlineIntelligenceIntelTag[];
  /**
   * 威胁类型
   */
  intelTypes?: string[];
  source?: string;
  updateTime?: string;
  [property: string]: any;
}

export interface OnlineIntelligenceIntelTag {
  tags?: string;
  tagsType?: string;
  [property: string]: any;
}

export interface OssIntelligence {
  /**
   * 可信度评分
   */
  confidence?: number;
  expired?: boolean;
  /**
   * 发现时间
   */
  findTime?: string;
  /**
   * 该条情报的标签信息，包含相关攻击团伙或该条情报的标签信息，包含相关攻击团伙该条情报的标签信或安全事件等安全事件等
   */
  intelTags?: OssIntelligenceIntelTag[];
  /**
   * 威胁类型
   */
  intelTypes?: string[];
  /**
   * 情报来源
   */
  source?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [property: string]: any;
}

export interface OssIntelligenceIntelTag {
  tags: string;
  tagsType: string;
  [property: string]: any;
}

export interface Port {
  detail?: string;
  module?: string;
  port?: number;
  product?: string;
  version?: string;
  [property: string]: any;
}

export interface Rdnse {
  getTime: string;
  rdns: string;
  [property: string]: any;
}

export interface Sample {
  hash?: string;
  malwareFamily?: string;
  malwareType?: string;
  ratio?: string;
  scanTime?: string;
  [property: string]: any;
}

export interface TagsClass {
  /**
   * 具体的攻击团伙或安全事件标签，例如：APT、海莲花等
   */
  tags: string;
  /**
   * 标签类别，如"industry(行业)"、"gangs（团伙）"、"virus_family（家族）"等
   */
  tagsType: string;
  [property: string]: any;
}
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
  const [modalStyle, setModalStyle] = useState({ left: 0, top: 0 });
  const [modalOpen, setModalOpen] = useState(false);
  const [inWide, setInWide] = useState({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
  });

  let [dataInfo, setDataInfo] = useState<Response>();
  let selectedTextRef = useRef("");

  let tabeColRender = useCallback((item: any) => {
    return item || "-";
  }, []);
  let tabeColRenderTime = useCallback((time: any) => {
    if (typeof time == "number" && time > 0)
      return moment(time).format("YYYY-MM-DD HH:mm:ss");
    else {
      return "-";
    }
  }, []);
  const items = useMemo(() => {
    let tagsClasses = dataInfo?.tagsClasses
      .reduce((pre: string[], item) => {
        return [...pre, ...item.tags.split(",")];
      }, [])
      .filter((item) => !!item);
    let judgments = dataInfo?.judgments ? dataInfo?.judgments : [];
    return [
      {
        key: "1",
        label: "情报标签",
        children: tagsClasses?.map((item, index) => {
          return (
            <Tag color="#E95454" key={index} className="mt2 mb2">
              {item}
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
        children: `${dataInfo?.asn?.number || ""} ${
          dataInfo?.asn?.info || "-"
        }`,
      },
    ];
  }, [dataInfo]);
  let listInfo = useMemo(() => {
    return [
      {
        key: "1",
        num: dataInfo?.onlineIntelligences
          ? dataInfo?.onlineIntelligences.length
          : 0,
        label: "在线情报",
      },
      {
        key: "2",
        num: dataInfo?.ossIntelligences ? dataInfo?.ossIntelligences.length : 0,
        label: "开源情报",
      },
      {
        key: "3",
        num: dataInfo?.ports ? dataInfo?.ports?.length : 0,
        label: "开放端口",
      },
      {
        key: "4",
        num: dataInfo?.rdnses ? dataInfo?.rdnses.length : 0,
        label: "rDNS 记录",
      },
      {
        key: "5",
        num: dataInfo?.samples ? dataInfo?.samples?.length : 0,
        label: "相关样本",
      },
      {
        key: "6",
        num: dataInfo?.cas ? dataInfo?.cas?.length : 0,
        label: "SSL 相关证书",
      },
    ];
  }, [dataInfo]);

  let onlineIntCol = [
    {
      title: "情报来源",
      dataIndex: "source",
      render: tabeColRender,
    },
    {
      title: "发现时间",
      dataIndex: "findTime",
      width: 110,
      render: tabeColRenderTime,
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      width: 110,
      render: tabeColRenderTime,
    },
    {
      title: "可信度评分",
      dataIndex: "confidence",
      render: tabeColRender,
    },
    {
      title: "有效性",
      dataIndex: "expired",
      render: (item: boolean) => {
        let f = item ? "valid" : "invalid";
        let { color, text } = expiredType[f];
        return <span style={{ color: color }}>{text}</span>;
      },
    },
    {
      title: "威胁类型",
      dataIndex: "intelTypes",
      render: (intelTypes: any[]) => {
        return (
          <div>
            {intelTypes.length
              ? intelTypes?.map((item, index) => (
                  <Tag color="#E95454" key={index} className="mt2 mb2">
                    {item}
                  </Tag>
                ))
              : "-"}
          </div>
        );
      },
    },
    {
      title: "情报标签",
      dataIndex: "intelTags",
      render: (intelTags: OssIntelligenceIntelTag[]) => {
        let arr = intelTags
          .reduce((pre, item) => {
            return [...pre, ...item.tags.split(",")];
          }, [])
          .filter((item) => !!item);
        return (
          <div>
            {arr.length
              ? arr?.map((item, index) => (
                  <Tag color="#E95454" key={index} className="mt2 mb2">
                    {item}
                  </Tag>
                ))
              : "-"}
          </div>
        );
      },
    },
  ];
  let openPortCol = [
    {
      title: "端口号",
      dataIndex: "port",
      render: tabeColRender,
    },
    {
      title: "应用协议",
      dataIndex: "module",
      render: tabeColRender,
    },
    {
      title: "应用名称",
      dataIndex: "product",
      render: tabeColRender,
    },
    {
      title: "应用版本",
      dataIndex: "version",
      render: tabeColRender,
    },
    {
      title: "应用详情",
      dataIndex: "detail",
      render: tabeColRender,
    },
  ];

  let relatedSamplesCol = [
    {
      title: "文件 hash",
      dataIndex: "hash",
      render: tabeColRender,
    },
    {
      title: "检测时间",
      dataIndex: "scanTime",
      width: 110,
      render: tabeColRenderTime,
    },
    {
      title: "检出率",
      dataIndex: "ratio",
      render: tabeColRender,
    },
    {
      title: "恶意类型",
      dataIndex: "malwareType",
      render: (text = "基础设施") => <Tag color="#E95454">{text}</Tag>,
    },
    {
      title: "恶意家族",
      dataIndex: "malwareFamily",
      render: tabeColRender,
    },
  ];
  let sslCertCol = [
    {
      title: "协议",
      dataIndex: "protocol",
      render: tabeColRender,
    },
    {
      title: "端口信息",
      dataIndex: "port",
      render: tabeColRender,
    },
    {
      title: "用途",
      dataIndex: "digitalCertificate",
      width: "40%",
      render: (text: { purpose: any; subject: any }) =>
        text?.purpose || text?.subject,
    },
  ];
  const isValidIP = useCallback((ip: string) => {
    const ipRegex =
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipRegexIpv6 =
      /^(?:[0-9a-fA-F]{1,4}:){7}(?:[0-9a-fA-F]{1,4}|:)$|^(?:[0-9a-fA-F]{1,4}:){1,7}:$|^(?:[0-9a-fA-F]{1,4}:){1,6}:(?:[0-9a-fA-F]{1,4}|:)$|^(?:[0-9a-fA-F]{1,4}:){1,5}:(?:[0-9a-fA-F]{1,4}:){1,2}(?:[0-9a-fA-F]{1,4}|:)$|^(?:[0-9a-fA-F]{1,4}:){1,4}:(?:[0-9a-fA-F]{1,4}:){1,3}(?:[0-9a-fA-F]{1,4}|:)$|^(?:[0-9a-fA-F]{1,4}:){1,3}:(?:[0-9a-fA-F]{1,4}:){1,4}(?:[0-9a-fA-F]{1,4}|:)$|^(?:[0-9a-fA-F]{1,4}:){1,2}:(?:[0-9a-fA-F]{1,4}:){1,5}(?:[0-9a-fA-F]{1,4}|:)$|^:(?:[0-9a-fA-F]{1,4}:){1,6}(?:[0-9a-fA-F]{1,4}|:)$|^::(?:[0-9a-fA-F]{1,4}:){1,7}$|^(?:[0-9a-fA-F]{1,4}:){1,6}::$|^(?:[0-9a-fA-F]{1,4}:){1,5}::(?:[0-9a-fA-F]{1,4}|:)$|^(?:[0-9a-fA-F]{1,4}:){1,4}::(?:[0-9a-fA-F]{1,4}:){1,2}(?:[0-9a-fA-F]{1,4}|:)$|^(?:[0-9a-fA-F]{1,4}:){1,3}::(?:[0-9a-fA-F]{1,4}:){1,3}(?:[0-9a-fA-F]{1,4}|:)$|^(?:[0-9a-fA-F]{1,4}:){1,2}::(?:[0-9a-fA-F]{1,4}:){1,4}(?:[0-9a-fA-F]{1,4}|:)$|^::(?:[0-9a-fA-F]{1,4}:){1,5}(?:[0-9a-fA-F]{1,4}|:)$|^(?:[0-9a-fA-F]{1,4}:){1,7}::$|^(?:[0-9a-fA-F]{1,4}:){1,4}:(?:[0-9a-fA-F]{1,4}:)?[0-9a-fA-F]{1,4}$|^(?:[0-9a-fA-F]{1,4}:){1,3}:(?:[0-9a-fA-F]{1,4}:)?[0-9a-fA-F]{1,4}$|^(?:[0-9a-fA-F]{1,4}:){1,2}:(?:[0-9a-fA-F]{1,4}:)?[0-9a-fA-F]{1,4}$|^:(?:[0-9a-fA-F]{1,4}:)?[0-9a-fA-F]{1,4}$|^(?:[0-9a-fA-F]{1,4}:)?[0-9a-fA-F]{1,4}$/;
    return ipRegex.test(ip) && ip.indexOf("0.") != 0;
  }, []);
  let getResponseData = useCallback((response: { type: any; msg: any }) => {
    let { type, msg } = response;
    if (type === "FROM_CONTENT_IP") {
      if (!msg) {
        message.warning("IP信息获取失败");
      } else {
        setModalOpen(true);
        setDataInfo(
          Object.assign(
            {
              carrier: null,
              location: {},
              ossIntelligences: [],
              onlineIntelligences: [],
              ports: [],
              samples: [],
              cas: [],
              rdnses: [],
              tagsClasses: [],
              scene: null,
              asn: null,
              judgments: [],
              sumCurDomains: 0,
            },
            msg
          )
        );
        setShowIcon(false);
      }
    }
  }, []);
  useEffect(() => {
    function mouseup(event) {
      setTimeout(() => {
        try {
          setShowIcon(false);
          const selection = window.getSelection();
          const selectedText = selection.toString().trim();
          if (
            selection.rangeCount > 0 &&
            selectedText &&
            isValidIP(selectedText)
          ) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            if (rect.left == 0 && rect.width == 0) {
              setIconStyle({
                left: event.clientX,
                top: event.clientY - 40,
              });
            } else {
              setIconStyle({
                left: rect.left + rect.width,
                top: rect.top - 40 < 0 ? 0 : rect.top - 40,
              });
            }

            requestStorage("settingInfo", (setInfo) => {
              if (!setInfo.enable) return;
              setShowIcon(true);
              selectedTextRef.current = selectedText;
            });
          }
        } catch (e) {
          setShowIcon(false);
        }
      }, 0);
    }
    window.addEventListener("mouseup", mouseup);
    const handleResize = () => {
      setInWide({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("mouseup", mouseup);
      window.removeEventListener("resize", handleResize);
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
  useEffect(() => {
    if (modalOpen) return;
    let obj: any = { left: iconStyle.left + 30, top: iconStyle.top + 10 };
    if (iconStyle.left + 800 > inWide.innerWidth) {
      obj = {
        top: obj.top,
        right: 10,
      };
    }
    if (iconStyle.top + 750 > inWide.innerHeight) {
      obj = {
        ...obj,
        top: 30 + "px",
      };
    }
    setModalStyle(obj);
  }, [iconStyle, inWide, modalOpen]);

  return (
    <>
      {showIcon ? (
        <TzTooltip title={"查询威胁情报"} placement={"top"}>
          <img
            src={iconImgUrl}
            width={30}
            onMouseDown={() => {
              const selection = window.getSelection();
              selection.removeAllRanges();
              sendMessage(
                selectedTextRef.current,
                "FROM_CONTENT_IP",
                getResponseData
              );
            }}
            style={{
              position: "fixed",
              left: iconStyle.left,
              top: iconStyle.top,
              zIndex: 2147483647,
              cursor: "pointer",
            }}
          />
        </TzTooltip>
      ) : null}
      {modalOpen ? (
        <Draggable handle=".drag-handler">
          <div
            className={"aisoc-modal tz-aisoc"}
            style={{
              ...modalStyle,
              width: `700px`,
              opacity: `${modalOpen ? 1 : 0}`,
              zIndex: `${modalOpen ? 2147483645 : -9999}`,
            }}
          >
            <div className="drag-handler">
              <span
                className="flex-r-c f18"
                style={{
                  justifyContent: "space-between",
                  cursor: "move",
                  fontWeight: 550,
                  color: "#1E222A",
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
                    onClick={() => {
                      setModalStyle({ left: 0, top: 0 });
                      setModalOpen(false);
                    }}
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
                <div className="ml16" style={{ flex: 1 }}>
                  <div className="flex-r-c" style={{ flexWrap: "wrap" }}>
                    <span
                      className={"ip f24"}
                      style={{ display: "inline-block", width: "200px" }}
                    >
                      {dataInfo?.ip}
                    </span>
                    <span
                      className="mr40 flex-r-c mr40"
                      style={{ flex: 1, width: 0 }}
                    >
                      <i className="iconfont icon-weizhi mr4 f12"></i>
                      <span style={{ width: "92%" }}>
                        <TruncatedTextWithTooltip
                          content={
                            [
                              dataInfo?.location.country,
                              dataInfo?.location.province,
                              dataInfo?.location.city,
                            ]
                              .filter((item) => !!item)
                              .join("/") || "-"
                          }
                        />
                      </span>
                    </span>
                    <span
                      className="mr40 flex-r-c"
                      style={{ flex: 1, width: 0 }}
                    >
                      <i className="iconfont icon-a-yunyingshang2 mr4 f12"></i>
                      <span style={{ width: "92%" }}>
                        <TruncatedTextWithTooltip
                          content={dataInfo?.carrier || "-"}
                        />
                      </span>
                    </span>
                  </div>
                  <div className="flex-r-c f12" style={{ flexWrap: "wrap" }}>
                    {items.slice(0, 2).map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="mb8 flex-r-c"
                          style={{ width: "50%" }}
                        >
                          <span style={{ color: "#6C7480" }}>
                            {item.label}：
                          </span>
                          <span style={{ width: 0, flex: 1 }}>
                            <TruncatedTextWithTooltip
                              content={
                                item.children?.length != 0 ? item.children : "-"
                              }
                            />
                          </span>
                        </div>
                      );
                    })}
                    {items.slice(2).map((item, index) => {
                      return (
                        <div
                          key={index + 2}
                          className="mb8 flex-r-c"
                          style={{ width: "33%" }}
                        >
                          <span style={{ color: "#6C7480" }}>
                            {item.label}：
                          </span>
                          <span style={{ width: 0, flex: 1 }}>
                            <TruncatedTextWithTooltip
                              content={
                                item.children?.length != 0 ? item.children : "-"
                              }
                            />
                          </span>
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
                <TzTable
                  columns={onlineIntCol}
                  tableLayout={"fixed"}
                  dataSource={dataInfo?.onlineIntelligences}
                  size={"small"}
                  pagination={false}
                />
                <Title title={"开源情报"} className={"mb6 mt16"} />
                <TzTable
                  columns={onlineIntCol}
                  tableLayout={"fixed"}
                  dataSource={dataInfo?.ossIntelligences}
                  size={"small"}
                  pagination={false}
                />
                <Title title={"开放端口"} className={"mb6 mt16"} />
                <TzTable
                  columns={openPortCol}
                  tableLayout={"fixed"}
                  dataSource={dataInfo?.ports}
                  size={"small"}
                  pagination={false}
                />
                <Title title={"相关样本"} className={"mb6 mt16"} />
                <TzTable
                  columns={relatedSamplesCol}
                  locale={{ emptyText: <NoData /> }}
                  tableLayout={"fixed"}
                  dataSource={dataInfo?.samples}
                  size={"small"}
                  pagination={false}
                />
                <Title title={"rDNS 记录"} className={"mb6 mt16"} />
                <div>
                  {dataInfo?.rdnses ? (
                    dataInfo?.rdnses.map((item, index) => {
                      return (
                        <Tag color="#2177D1" key={index} className="mt2 mb2">
                          {item.rdns}
                        </Tag>
                      );
                    })
                  ) : (
                    <NoData />
                  )}
                </div>
                <Title title={"SSL 相关证书"} className={"mb6 mt16"} />
                <TzTable
                  tableLayout={"fixed"}
                  columns={sslCertCol}
                  dataSource={dataInfo?.cas}
                  size={"small"}
                  pagination={false}
                />
              </div>
            </div>
          </div>
        </Draggable>
      ) : null}
    </>
  );
};

export default App;
