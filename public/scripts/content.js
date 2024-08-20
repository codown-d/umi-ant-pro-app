// 监听来自 injected script 的消息
window.addEventListener('message', (event) => {
  if (event.source !== window) return; // 确保消息是从同一个页面发来的
  if (event.data.type && event.data.type === 'FROM_PAGE') {
    console.log('Received from injected script:', event.data.msg);
    // 向 background 发送消息
    chrome.runtime.sendMessage(
      { type: 'FROM_CONTENT_SCRIPT', msg: event.data.msg },
      (response) => {
        // 接收 background 的响应
        window.postMessage(
          { type: 'FROM_CONTENT_SCRIPT', msg: response.farewell },
          '*',
        );
      },
    );
  }
});
