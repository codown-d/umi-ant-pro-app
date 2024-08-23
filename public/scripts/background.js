const welcomePage = '/index.html';
const basUrl = 'http://139.9.228.139:31188';
async function fetchData(url, method, prams) {
  let newUrl = url;
  if (method == 'GET') {
    newUrl = `${url}?${new URLSearchParams(prams)}`;
  }
  try {
    const response = await fetch(`${basUrl}${newUrl}`, {
      method: method || 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: method == 'GET' ? undefined : JSON.stringify(prams),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`请求失败: ${error.message}`);
  }
}
function debug(...args) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}]`, ...args);
}
function sendPanelData(msg, type) {
  chrome.storage.session.set({ webinfo: msg });
  chrome.runtime.sendMessage({
    type: 'FROM_BACKGROUND_' + type.toUpperCase(),
    msg: msg,
  });
}
chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setOptions({ path: welcomePage });
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    sendPanelData(
      {
        title: tab.title,
        url: tab.url,
      },
      'webinfo',
    );
  });
  chrome.storage.local.get('settingInfo', function (result) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: 'FROM_BACKGROUND_SETINFO',
        msg: result['settingInfo'],
      });
    });
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['scripts/onupdate.js', 'scripts/index-DA_nUF1f.js'],
    });
  }
});

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (details && details.method === 'POST') {
      const rawData = details.requestBody.raw[0].bytes;
      const decoder = new TextDecoder('utf-8');
      const decodedString = decoder.decode(rawData);
      try {
        const jsonData = JSON.parse(decodedString);
        console.log('Parsed JSON Data:', jsonData);
        fetchData('/api/v1/webAction', 'POST', jsonData).then((res) => {
          console.log(res);
        });
      } catch (error) {
        console.error('Failed to parse JSON:', error);
      }
    }
  },
  {
    urls: ['https://console.tensorsecurity.cn/*'],
  },
  ['requestBody'],
);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  if (request.type === 'FROM_CONTENT_WEBINFO') {
    let info = JSON.parse(request.msg);
    sendPanelData(info, 'webinfo');
  } else if (request.type === 'FROM_CONTENT_IP') {
    fetchData('/api/v1/ip/' + request.msg)
      .then((res) => {
        sendResponse({
          msg: Object.assign({ ip: request.msg }, res.data.item),
        });
      })
      .catch((error) => {
        sendResponse({ success: false, error: error.message });
      });
    return true;
  }
});
