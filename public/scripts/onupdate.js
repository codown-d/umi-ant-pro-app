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
  if (event.source !== window) return;
  let type = event.data.type;
  if (type === 'FROM_CONTENT_IP' && window.AISOC) {
    let msg = event.data.msg;
    if (!msg) {
      window.AISOC.message('IP信息获取失败');
    } else {
      window.AISOC.openModal(msg, pos);
    }
  }
}

function isValidIP(ip) {
  const ipRegex =
    /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$/;
  const ipRegexIpv6 =
    /^(?:[0-9a-fA-F]{1,4}:){7}(?:[0-9a-fA-F]{1,4}|:)$|^(?:[0-9a-fA-F]{1,4}:){1,7}:$|^(?:[0-9a-fA-F]{1,4}:){1,6}:(?:[0-9a-fA-F]{1,4}|:)$|^(?:[0-9a-fA-F]{1,4}:){1,5}:(?:[0-9a-fA-F]{1,4}:){1,2}(?:[0-9a-fA-F]{1,4}|:)$|^(?:[0-9a-fA-F]{1,4}:){1,4}:(?:[0-9a-fA-F]{1,4}:){1,3}(?:[0-9a-fA-F]{1,4}|:)$|^(?:[0-9a-fA-F]{1,4}:){1,3}:(?:[0-9a-fA-F]{1,4}:){1,4}(?:[0-9a-fA-F]{1,4}|:)$|^(?:[0-9a-fA-F]{1,4}:){1,2}:(?:[0-9a-fA-F]{1,4}:){1,5}(?:[0-9a-fA-F]{1,4}|:)$|^:(?:[0-9a-fA-F]{1,4}:){1,6}(?:[0-9a-fA-F]{1,4}|:)$|^::(?:[0-9a-fA-F]{1,4}:){1,7}$|^(?:[0-9a-fA-F]{1,4}:){1,6}::$|^(?:[0-9a-fA-F]{1,4}:){1,5}::(?:[0-9a-fA-F]{1,4}|:)$|^(?:[0-9a-fA-F]{1,4}:){1,4}::(?:[0-9a-fA-F]{1,4}:){1,2}(?:[0-9a-fA-F]{1,4}|:)$|^(?:[0-9a-fA-F]{1,4}:){1,3}::(?:[0-9a-fA-F]{1,4}:){1,3}(?:[0-9a-fA-F]{1,4}|:)$|^(?:[0-9a-fA-F]{1,4}:){1,2}::(?:[0-9a-fA-F]{1,4}:){1,4}(?:[0-9a-fA-F]{1,4}|:)$|^::(?:[0-9a-fA-F]{1,4}:){1,5}(?:[0-9a-fA-F]{1,4}|:)$|^(?:[0-9a-fA-F]{1,4}:){1,7}::$|^(?:[0-9a-fA-F]{1,4}:){1,4}:(?:[0-9a-fA-F]{1,4}:)?[0-9a-fA-F]{1,4}$|^(?:[0-9a-fA-F]{1,4}:){1,3}:(?:[0-9a-fA-F]{1,4}:)?[0-9a-fA-F]{1,4}$|^(?:[0-9a-fA-F]{1,4}:){1,2}:(?:[0-9a-fA-F]{1,4}:)?[0-9a-fA-F]{1,4}$|^:(?:[0-9a-fA-F]{1,4}:)?[0-9a-fA-F]{1,4}$|^(?:[0-9a-fA-F]{1,4}:)?[0-9a-fA-F]{1,4}$/;

  return ipRegex.test(ip) || ipRegexIpv6.test(ip);
}
function aisocMouseup(event) {
  let setInfo = JSON.parse(
    window.localStorage.getItem('AISOC_SETINFO') != 'undefined'
      ? window.localStorage.getItem('AISOC_SETINFO') || '{}'
      : '{}',
  );
  if (!setInfo.enable) return;
  setTimeout(()=>{
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      pos = { startX: rect.left, startY: rect.top - 40 };
      if (selectedText && isValidIP(selectedText)) {
        sendMessage(selectedText, 'FROM_PAGE_IP');
      }
    }
  },0)

}
function init() {
  if (!document.getElementById('AISOC')) {
    const newDiv = document.createElement('div');
    newDiv.id = 'AISOC';
    document.body.appendChild(newDiv);
    window.addEventListener('mousedown', (event) => {
      event.stopPropagation()
      'aisocIconImg'!=event.target.id&&window.AISOC.setShowIcon(false);
    });
    window.addEventListener('message', handleMessage);
    window.addEventListener('mouseup', aisocMouseup);
  } else {
    sendWebInfo();
  }
}
init();
