const fs=require('fs')
/**
 * 涉及文件读写的最好用异步方法，
 * 磁盘访问一次需要十万到百万时钟周期
 * @type {[type]}
 */
let statObj=fs.statSync('out/copy.txt')
console.log(statObj)
// Stats {
//   dev: 3070224671,
//   mode: 33206,
//   nlink: 1,
//   uid: 0,
//   gid: 0,
//   rdev: 0,
//   blksize: undefined,
//   ino: 1125899907267852,
//   size: 1266,
//   blocks: undefined,
//   atimeMs: 1518404871950,
//   mtimeMs: 1518405449403,
//   ctimeMs: 1518405449403,
//   birthtimeMs: 1518404871950,
//   atime: 2018-02-12T03:07:51.950Z,
//   mtime: 2018-02-12T03:17:29.403Z,
//   ctime: 2018-02-12T03:17:29.403Z,
//   birthtime: 2018-02-12T03:07:51.950Z }