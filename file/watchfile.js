 /**
  * fs操作学习
  * @type {[type]}
  */
 const net = require('net');
 const fs=require('fs')
 const path=require('path')
 const outputDir='./out'
 const filename='./copy.txt'
 const server = net.createServer();
 /**
  * 监听一个文件是否有变化，很有用
  * node底层是轮询实现的，5007微秒，源码有
  * @param  {[type]}
  * @param  {[type]}
  * @return {[type]}
  */
fs.watchFile(path.join(outputDir,filename), function (curr, prev) {
  console.log('the current mtime is: ' + curr.mtime);
  console.log('the previous mtime was: ' + prev.mtime);
});
//服务器用来让监听一直不退出
server.listen(9000, function () { console.log('Listening on port 9000'); });