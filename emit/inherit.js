/**
 * Event Emitter 接口可以部署在任意对象上，使得这些对象也能订阅和发布消息。
 */
var EventEmitter = require('events').EventEmitter;

function Dog(name) {
  this.name = name;
}

Dog.prototype.__proto__ = EventEmitter.prototype;
// 另一种写法
// Dog.prototype = Object.create(EventEmitter.prototype);

var simon = new Dog('simon');

simon.on('bark', function () {
  console.log(this.name + ' barked');
});

setInterval(function () {
  simon.emit('bark');
}, 500);