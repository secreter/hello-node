/*
用管道来优化顺序执行的异步函数控制流
实现了读取多个文件拼接的功能
 */
const fromArray = require('from2-array')
const through = require('through2')
const fs = require('fs')
function concatFiles (dest, files, callback) {
  const destStream = fs.createWriteStream(dest)
  fromArray.obj(files)
    .pipe(through.obj((file, enc, done) => {
      const src = fs.createReadStream(file)
      src.pipe(destStream, {end: false})           // src结束后，dist不结束
      src.on('end', done)
    }))
    .on('finish', _ => {
      destStream.end()      // 结束dist
      callback()
    })
}
module.exports = concatFiles
