export function sendMessage(data: any, type: string) {
  window.postMessage(
    {
      msg: data,
      type: type || "FROM_PAGE",
    },
    "*"
  );
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
