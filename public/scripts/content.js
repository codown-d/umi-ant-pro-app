window.addEventListener('message', (event) => {
  if (
    event.source !== window ||
    !event.data ||
    event.data.type.indexOf('FROM_PAGE') != 0
  )
    return;

  let type = event.data.type.replace('PAGE', 'CONTENT');
  chrome.runtime.sendMessage({ type, msg: event.data.msg }, (response) => {
    response && window.postMessage({ type, msg: response.msg }, '*');
  });
});
