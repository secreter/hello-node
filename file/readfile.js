/**
 * 注意，如果是相对路径，
 * 是相对于当前进程所在的路径（process.cwd()），而不是相对于当前脚本所在的路径。
 * @type {[type]}
 */
var fs=require('fs')
var util=require('util')
fs.readFile('./img.jpg', function (err, buffer) {
  if (err) throw err;
  console.log(buffer);
})
fs.exists('/path/to/file', function (exists) {
  util.debug(exists ? "it's there" : "no file!");
});