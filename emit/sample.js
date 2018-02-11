/**
 * Event Emitter 是一个接口，可以在任何对象上部署。这个接口由events模块提供。
 * events模块的EventEmitter是一个构造函数，可以用来生成事件发生器的实例emitter。
 * 然后，事件发生器的实例方法on用来监听事件，实例方法emit用来发出事件。
 */

var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();
emitter.on('someEvent', function () {
  console.log('event has occured');
});

function f() {
  console.log('start');
  emitter.emit('someEvent');
  console.log('end');
}

f()
// start
// event has occured
// end

//上面代码还表明，
//EventEmitter对象的事件触发和监听是同步的，即只有事件的回调函数执行以后，函数f才会继续执行