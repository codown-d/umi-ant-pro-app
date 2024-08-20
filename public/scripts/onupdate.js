function collectWebInfo() {
  return window.location;
}
function sendMessage(data) {
  window.postMessage(
    {
      type: 'FROM_PAGE',
      msg: data,
    },
    '*',
  );
}
function sendWebInfo() {
  const webInfo = collectWebInfo();
  const { protocol, hostname, port, pathname, search, hash } = webInfo;
  sendMessage(
    JSON.stringify({
      protocol,
      hostname,
      port,
      pathname,
      search,
      hash,
      title: document.title,
    }),
  );
}
window.addEventListener('message', (event) => {
  if (event.source !== window) return; // 确保消息是从同一个页面发来的
  if (event.data.type && event.data.type === 'FROM_CONTENT_SCRIPT') {
    console.log('Received from content script:', event.data.msg);
  }
});
sendWebInfo();
