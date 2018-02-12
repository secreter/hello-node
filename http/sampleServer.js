/**
 * http模块学习
 */
const http = require('http')
const fs = require('fs')
const stream = require('stream')
const path = require('path')
const staticDir='./static'

http.createServer(function (request, response){
	console.log(request.method,' ',request.url)
	if(request.url==='index'){
		//路由实现
		response.writeHead(200, { "Content-Type": "text/html" });
    	response.end("Welcome to the homepage!");
	}else if(/\/static\/.+/.test(request.url)){
		//  /xxx,表示是从根目录取。./是当前目录
		console.log(fs.existsSync('./'+request.url))
		//静态服务器实现
		if(fs.existsSync('./'+request.url)){
			let fileStream=fs.createReadStream('./'+request.url)
			fileStream.pipe(response)
		}else{
			response.writeHead(404, { "Content-Type": "text/plain" });
    		response.end("not found the file!");
		}

	}else{
		//添加响应头
	  response.writeHead(200, {'Content-Type': 'text/plain'});
	  	//添加响应体
	  response.write("Hello World");
	  	//表示结束，也可以再追加最后一次信息
	  response.end('~~~');
	}
}).listen(9000, '127.0.0.1');

console.log('Server running on port 9000.');