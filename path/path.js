const path=require('path')
const dir='dir'
const filename='file.txt'
//连接路径
const filepath=path.join(dir,filename)
//转换绝对路径
const fullpath=path.resolve(filepath)
//多个操作
const parentpath=path.resolve(filepath,'../')

console.log(filepath)
console.log(fullpath)
console.log(parentpath)

/**
 * 应该挺常用的
 */
//path.parse()方法可以返回路径各部分的信息。
let myFilePath = '/someDir/someFile.json';
path.parse(myFilePath).base
// "someFile.json"
path.parse(myFilePath).name
// "someFile"
path.parse(myFilePath).ext
// ".json"