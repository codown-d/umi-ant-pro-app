window.addEventListener('message', (event) => {
  if (
    event.source !== window ||
    !event.data ||
    event.data.type.indexOf('FROM_PAGE') != 0
  )
    return;

  let type = event.data.type.replace('PAGE', 'CONTENT');
  chrome.runtime.sendMessage({ type, msg: event.data.msg }, (response) => {
    if (!chrome.runtime.lastError) {
      response && window.postMessage({ type, msg: response.msg }, '*');
      console.log('收到响应:', response);
    } else {
      console.error('消息发送失败:', chrome.runtime.lastError.message);
    }
  });
});
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log(123456);
//   if (message.type === 'getPageMetadata') {
//     const metadata = {
//       title: document.title,
//       url: window.location.href,
//     };
//     console.log(123456, metadata);
//     sendResponse(metadata);
//   }
// });
