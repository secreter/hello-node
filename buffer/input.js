var fs = require('fs');
var buffer = new Buffer(1024);

var readSize = fs.readSync(fs.openSync('/dev/tty', 'r'), buffer, 0, bufferSize);
var chunk = buffer.toString('utf8', 0, readSize);

console.log('INPUT: ' + chunk);