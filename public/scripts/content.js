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
    }
  });
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('SETINFO', request);
  if (request.type === 'FROM_BACKGROUND_SETINFO') {
    window.localStorage.setItem('AISOC_SETINFO', JSON.stringify(request.msg));
    sendResponse();
  }
});
