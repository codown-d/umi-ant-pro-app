import { message } from "antd";

export function sendMessage(
  data: any,
  type: string,
  callback?: (arg?: any) => void
) {
  if (chrome.runtime) {
    chrome.runtime?.sendMessage(
      { type: type || "FROM_PAGE", msg: data },
      (response: any) => {
        if (response?.error) {
          message.error(response.error);
          return;
        }
        callback?.(response);
      }
    );
  } else {
    callback?.({
      type: type,
      msg: {},
    });
  }
}

export function requestStorage(key: string, callback: (arg: any) => void) {
  if (chrome.runtime) {
    chrome.runtime?.sendMessage(
      { type: "FROM_PAGE_GETPLUGCONFIG", key },
      (response: any) => {
        if (response.error) {
          console.error("Error retrieving data:", response.error);
          return;
        }
        callback(response.value);
      }
    );
  } else {
    callback({ enable: true });
  }
}
