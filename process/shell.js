/**
 * process对象是 Node 的一个全局对象，提供当前 Node 进程的信息。
 * 它可以在脚本的任意位置使用，不必通过require命令加载。该对象部署了EventEmitter接口。
 * 
 */
const fs = require('fs');
const zlib = require('zlib')
//将一个文件导向标准输出
fs.createReadStream('me.txt')
  .pipe(process.stdout)

process.stdout.write('hello node process stdout\n')
process.stdout.write('please input:\n')
// process.stdin.pipe(process.stdout)
console.log("argv: ", process.argv)