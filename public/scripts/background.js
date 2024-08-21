const welcomePage = '/index.html';
// const mainPage = 'frontend/side.html';

chrome.runtime.onInstalled.addListener(() => {
  debug('chrome.runtime.onInstalled.addListener:');
  chrome.sidePanel.setOptions({ path: welcomePage });
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});
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
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  if (request.type === 'FROM_CONTENT_SCRIPT') {
    sendResponse({ msg: 'Goodbye from background' });
  } else if (request.type === 'FROM_CONTENT_IP') {
    fetchData('/api/v1/ip/' + request.msg)
      .then((data) => {
        sendResponse({ msg: Object.assign({ ip: request.msg }, data) });
      })
      .catch((error) => {
        sendResponse({ success: false, error: error.message });
      });
    return true;
  }
});
//页面刷新或打开时触发动作
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['scripts/onupdate.js', 'scripts/index-DpZqY0uN.js'],
    });
  }
});

function debug(...args) {
  const timestamp = new Date().toISOString();
}

// onCompleted，没有body数据
chrome.webRequest.onCompleted.addListener(
  function (details) {
    debug('chrome.webRequest.onCompleted:');

    // console.log('Completed Request URL:', details.url);
    // console.log('method:', details.method, details);
    // console.log('Response Status Code:', details.statusCode);

    let postData = '';
    if (details.method == 'POST') {
      if (details.requestBody) {
        postData = decodeURIComponent(
          String.fromCharCode.apply(
            null,
            new Uint8Array(details.requestBody.raw[0].bytes),
          ),
        );
      }
      //console.log(postedString)
    }

    const tabId = details.tabId;
    const key = `list_${tabId}`;
    // const newValue = {
    //         [key]: {
    //             url: details.url,
    //             tabId: tabId,
    //             method: details.method,
    //             code: details.statusCode,
    //             post: postData,
    //         }
    //     }
    // ;
    //
    // // setData(newValue)
    // // 更新存储数据
    // debug("save value:", key, newValue)

    // chrome.storage.session.set(newValue, () => {
    //     if (chrome.runtime.lastError) {
    //         console.error(chrome.runtime.lastError);
    //     } else {
    //         console.log('chrome.tabs.onUpdated.addListener::数据已更新');
    //     }
    // });

    chrome.storage.session.get(key, function (result) {
      // 检查是否存在数组
      const tabId = details.tabId;
      const key = `list_${tabId}`;
      let resArray = result[key] || [];
      const newValue = {
        url: details.url,
        tabId: tabId,
        method: details.method,
        code: details.statusCode,
        post: postData,
      };

      // setData(newValue)
      // 更新存储数据
      debug('save value:', key, newValue);

      // 追加新的元素到数组
      resArray.push(newValue);

      // 存储更新后的数组
      chrome.storage.session.set({ [key]: resArray }, function () {
        // console.log(
        //   'Array updated and stored in chrome.storage.session',
        //   resArray,
        // );
      });
    });
  },
  {
    urls: [
      '<all_urls>',
      'https://developer.chrome.com/docs/extensions*',
      'http://localhost:8080/*',
      'http://127.0.0.1:3000/*',
    ],
  },
  ['responseHeaders', 'extraHeaders'],
);

//
// chrome.devtools.network.onRequestFinished.addListener(request => {
//
//     debug("chrome.devtools.network.onRequestFinished:", request.request.url)
//
//     request.getContent((body) => {
//         debug("chrome.devtools.network.onRequestFinished:", request.request.url)
//         if (request.request && request.request.url) {
//             //     if (request.request.url.includes('facebook.com')) {
//             //
//             //         //continue with custom code
//             //         var bodyObj = JSON.parse(body);//etc.
//             //     }
//
//             const tabId = request.tabId;
//             const key = `list_${tabId}`
//             const newValue = {
//                     [key]: {
//                         url: request.request.url,
//                         tabId: tabId,
//                         method: request.method,
//                         post: request.postData,
//                         body: request.body.toString()
//
//                     }
//                 }
//             ;
//
//
//             // setData(newValue)
//             // 更新存储数据
//             debug("save value:", key, newValue)
//
//             chrome.storage.session.set(newValue, () => {
//                 if (chrome.runtime.lastError) {
//                     console.error(chrome.runtime.lastError);
//                 } else {
//                     console.log('chrome.tabs.onUpdated.addListener::数据已更新');
//                 }
//             });
//
//
//         }
//
//     });
// });
