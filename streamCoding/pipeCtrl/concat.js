/*
pipe到可读可写流，实现管道链式调用
  node concat together concat.js concat.js
 */
const concatFiles = require('./concatFiles')
concatFiles(process.argv[2], process.argv.slice(3), () => {
  console.log('success!')
})
