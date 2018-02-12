 /**
  * fs操作学习
  * @type {[type]}
  */
 const fs=require('fs')
 const path=require('path')
 const outputDir='./out'
 const filename='./copy.txt'
 const source='./spider.js'
 /**
  * 表达式函数不会被声明提前，只能放在调用前面，
  * 以后还是放在开头或者单独的文件吧
  * @return {[type]}
  */
 const readAndWrite=()=>{
	fs.readFile(source, function (err, buffer) {
	  if (err) throw err;
	  console.log(buffer.toString('utf8'))
	  //为啥是buffer,写入之后变成文本了
	  fs.writeFile(path.join(outputDir,filename),buffer,(err)=>{
	  	if (err) throw err;
	  	console.log('success')
	  })
	});
}
 //文件夹不存在，创建
if(!fs.existsSync(outputDir)){
	console.log('mkdir')
	fs.mkdir(outputDir,0777, function (err) {
	  if (err) throw err;
	  readAndWrite()
	});
}else{
	readAndWrite()
}

