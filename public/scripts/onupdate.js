function sendMessage(data, type) {
  window.postMessage(
    {
      msg: data,
      type: type || 'FROM_PAGE',
    },
    '*',
  );
}
function sendWebInfo() {
  sendMessage(
    JSON.stringify({ url: window.location.href, title: document.title }),
    'FROM_PAGE_WEBINFO',
  );
}
var pos = { startX: 0, startY: 0 };
function handleMessage(event) {
  console.log(event);
  if (event.source !== window) return;
  let type = event.data.type;
  if (type === 'FROM_CONTENT_IP' && window.AISOC) {
    let msg = event.data.msg;
    window.AISOC.openModal(msg, pos);
  }
}

function aisocMousedown(event) {
  pos = { startX: event.clientX, startY: event.clientY };
}
function isValidIP(ip) {
  const ipRegex =
    /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$/;

  return ipRegex.test(ip);
}
function aisocMouseup(event) {
  let setInfo = JSON.parse(
    window.localStorage.getItem('AISOC_SETINFO') || '{}',
  );
  console.log(setInfo);
  if (!setInfo.enable) return;
  const distance = Math.abs(event.clientX - pos.startX);
  if (distance > 5) {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText && isValidIP(selectedText)) {
      sendMessage(selectedText, 'FROM_PAGE_IP');
    }
  }
}
function init() {
  if (!document.getElementById('AISOC')) {
    const newDiv = document.createElement('div');
    newDiv.id = 'AISOC';
    newDiv.style.display = 'none';
    document.body.appendChild(newDiv);

    window.addEventListener('message', handleMessage);
    window.addEventListener('mousedown', aisocMousedown);
    window.addEventListener('mouseup', aisocMouseup);
  } else {
    sendWebInfo();
  }
}
init();
