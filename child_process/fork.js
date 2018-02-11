/**
 * fork方法直接创建一个子进程，执行Node脚本，fork('./child.js') 相当于 spawn('node', ['./child.js']) 。
 * 与spawn方法不同的是，fork会在父进程与子进程之间，建立一个通信管道，用于进程之间的通信。
 * fork方法返回一个代表进程间通信管道的对象，对该对象可以监听message事件，
 * 用来获取子进程返回的信息，也可以向子进程发送信息。
 */
var child_process = require('child_process');
var n = child_process.fork('./child.js');
n.on('message', function(m) {
  console.log('PARENT got message:', m);
});
n.send({ hello: 'world' });