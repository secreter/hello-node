/*
pipe到可读可写流，实现管道链式调用
 echo 'hello world' | node replace.js world node
 */
const ReplaceStream = require('../transformStream/replaceStream')
process.stdin
.pipe(new ReplaceStream(process.argv[2], process.argv[3]))
.pipe(process.stdout)
