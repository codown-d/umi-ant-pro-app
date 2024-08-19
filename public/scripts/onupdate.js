
function collect(){
console.log("onupdate.js:: ",window.location)
// 获取当前URL的信息
const url = window.location;

// 获取各个部分的信息
const schema = url.protocol; // 获取协议，例如 'http:' 或 'https:'
const domain = url.hostname; // 获取域名，例如 'www.example.com'
const port = url.port;       // 获取端口号，例如 '8080'。如果是默认端口（80或443），则为空字符串
const path = url.pathname;   // 获取路径，例如 '/path/to/page'
const query = url.search;    // 获取查询字符串，例如 '?name=value&key=value'
const hash = url.hash;       // 获取锚点值，例如 '#section1'

// 打印这些信息
console.log('Schema:', schema);
console.log('Domain:', domain);
console.log('Port:', port);
console.log('Path:', path);
console.log('Query:', query);
console.log('Hash:', hash);

}
collect()