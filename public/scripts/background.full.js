const welcomePage = 'index.html';
// const mainPage = 'frontend/side.html';

chrome.runtime.onInstalled.addListener(() => {
    debug("chrome.runtime.onInstalled.addListener:")

    chrome.sidePanel.setOptions({path: welcomePage});
    chrome.sidePanel.setPanelBehavior({openPanelOnActionClick: true});
});

//页面激活，暂时不需要
// chrome.tabs.onActivated.addListener(async ({tabId}) => {
//     debug(`
//
//     chrome.tabs.onActivated.addListener:
//
//     `)
//
//     const {path} = await chrome.sidePanel.getOptions({tabId});
//     if (path === welcomePage) {
//         chrome.sidePanel.setOptions({path: mainPage});
//     }
// });


//onBeforeRequest,调试的时候用，先关闭
// chrome.webRequest.onBeforeRequest.addListener(
//     (info) => {
//         console.log("Cat intercepted: " + info.url);
//         // Redirect the lolcal request to a random loldog URL.
//         var i = Math.round(Math.random() * loldogs.length);
//         return { redirectUrl: loldogs[i] };
//     },
//     {urls: [
//             "https://developer.chrome.com/docs/extensions*",
//             "http://127.0.0.1:3000/example-form*"
//         ]},
//     ["blocking", "requestBody", "extraHeaders"]
// );

//onBeforeRequest,调试的时候用，先关闭
// chrome.webRequest.onBeforeRequest.addListener(
//     function(details) {
//         debug("chrome.webRequest.onBeforeRequest:")
//
//         console.log("Cat intercepted: ");
//         if (details.method === 'POST' || details.method === 'PUT') {
//             let requestBody = "";
//             if (details.requestBody && details.requestBody.raw) {
//                 requestBody = new TextDecoder("utf-8").decode(details.requestBody.raw[0].bytes);
//             }
//             console.log("URL:", details.url);
//             console.log("Method:", details.method);
//             console.log("Request Body:", requestBody);
//         }
//     },
//     {urls: ["<all_urls>"]},
//     ["requestBody"]
// );

//发送header，暂时不需要
// chrome.webRequest.onBeforeSendHeaders.addListener(
//     function(details) {
//         console.log("Request Headers:", details.requestHeaders);
//     },
//     {urls: ["<all_urls>"]},
//     ["requestHeaders"]
// );


chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if(details.method == "POST")
            // Use this to decode the body of your post
            var postedString = decodeURIComponent(String.fromCharCode.apply(null,
                new Uint8Array(details.requestBody.raw[0].bytes)));
        console.log(postedString)

    },
    {urls: ["<all_urls>"]},
    ["blocking", "requestBody"]
);

// onCompleted，没有body数据
chrome.webRequest.onCompleted.addListener(function (details) {
        debug("chrome.webRequest.onCompleted:")

        console.log('Completed Request URL:', details.url);
        console.log('method:',  details.method, details);
        console.log('Response Status Code:', details.statusCode);
    }, {urls: [
            "https://developer.chrome.com/docs/extensions*",
            "http://localhost:8080/*",
            "http://127.0.0.1:3000/*"
        ]},
    ["responseHeaders", "extraHeaders"]
);


//页面刷新或打开时触发动作
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    //只关注 complete ，其他不关注
    //changeInfo.status doc:: https://developer.chrome.com/docs/extensions/reference/api/tabs#type-TabStatus
    if (changeInfo.status === 'complete') {
        debug("chrome.tabs.onUpdated.addListener",tabId,changeInfo.status,changeInfo,tab)
        chrome.scripting.executeScript({
            target: {tabId: tabId}, files: ['scripts/onupdate.js']
        });
    }
});



function debug(...args) {

    const timestamp = new Date().toISOString();
    console.log(`
    
    
    [DEBUG - ${timestamp}]
    
    `,...args
    );
    // console.log(...args);
}

// chrome.devtools.network.onRequestFinished.addListener(
//     function(request) {
//         if (request.response.bodySize > 40*1024) {
//             chrome.devtools.inspectedWindow.eval(
//                 'console.log("Large image: " + unescape("' +
//                 escape(request.request.url) + '"))');
//         }
//     }
// );
//
// chrome.devtools.network.onRequestFinished.addListener(request => {
//
//     debug("chrome.devtools.network.onRequestFinished:",request.request.url)
//
//     request.getContent((body) => {
//         debug("chrome.devtools.network.onRequestFinished:",request.request.url)
//         // if (request.request && request.request.url) {
//         //     if (request.request.url.includes('facebook.com')) {
//         //
//         //         //continue with custom code
//         //         var bodyObj = JSON.parse(body);//etc.
//         //     }
//         // }
//
//
//     });
// });

