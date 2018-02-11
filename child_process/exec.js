/**
 * exec方法用于执行bash命令，它的参数是一个命令字符串。
 */
var exec = require('child_process').exec;

var ls = exec('cd ./', function (error, stdout, stderr) {
  if (error) {
    console.log(error.stack);
    console.log('Error code: ' + error.code);
  }
  console.log('Child Process STDOUT: ' + stdout);
});