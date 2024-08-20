// console.log("This is a popup console message!")
// console.log("This is a popup console message!")
// console.log("This is a popup console message!")
// console.log("This is a popup console message!")
// console.log("This is a popup console message!")
// alert(" alert message")

let debug = false
let domain = "http://127.0.0.1:3000/api/insight"
document.addEventListener('click', (event) => {
  console.log('InsightGo: User clicked:');

  const newValue = {
    url: "url string",
    post: "post string",
    title: "title string"
  };
  // setData(newValue)
  // 更新存储数据
  chrome.storage.session.set({key: newValue}, () => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else {
      console.log('数据已更新');
    }
  });


  // 获取事件目标元素
  var target = event.target;

  // 检查目标元素是否是按钮，并且类型是 "submit"
  if (target.tagName === 'BUTTON' && target.type === 'submit') {
    console.log('InsightGo: Submit button clicked');


    event.preventDefault();

    // 获取包含该按钮的表单
    var form = target.closest('form');

    if (form) {
      // 使用FormData对象获取表单数据
      var formData = new FormData(form);

      // 创建一个对象来存储表单数据
      var formValues = {};
      formData.forEach((value, key) => {
        formValues[key] = value;
      });

      const clickData = {
        classes: event.target.className,
        element: event.target.tagName,
        formValues: formValues,
        id: event.target.id,
        timestamp: new Date().toISOString()
      };

      // 输出表单数据
      console.log(clickData);

      if (debug === true) {
        alert("点击事件debug")
      }
      // 将数据发送到服务器
      fetch(domain, {
        method: 'POST', headers: {
          'Content-Type': 'application/json'
        }, body: JSON.stringify(clickData)
      })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch((error) => console.error('Error:', error));

      form.submit();
    }
  }
});
