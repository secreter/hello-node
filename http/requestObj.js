/**
 * 对request 剖析
 * readable
domain
socket
connection
httpVersionMajor
httpVersionMinor
httpVersion
complete
headers
rawHeaders
trailers
rawTrailers
upgrade
url
method
statusCode
statusMessage
client
setTimeout
read
destroy
push
unshift
isPaused
setEncoding
pipe
unpipe
on
addListener
resume
pause
wrap
setMaxListeners
getMaxListeners
emit
prependListener
once
prependOnceListener
removeListener
removeAllListeners
listeners
listenerCount
eventNames

 */
const http=require('http')
const url=require('url')
const querystring = require('querystring')

http.createServer(function (request, response){
	// for(let k in request){
	// 	if(!/^_/.test(k)){
	// 		//filter private attributes
	// 		console.log(k)
	// 	}
		
	// }
	let pathname = url.parse(request.url).pathname
	console.log(pathname)
	//setEncoding()方法用于设置请求的编码。应该来讲是解析请求的编码吧
	request.setEncoding("utf8")
	let postData = '';
	request.addListener('data', function (postDataChunk) {
	  postData += postDataChunk;
	});
	request.on('end', function () {
	   console.log(postData)
	 	// ----------------------------105690414000740509502118
		// Content-Disposition: form-data; name="name"

		// zhangsan	
		// ----------------------------105690414000740509502118
		// Content-Disposition: form-data; name="sex"

		// male
		// ----------------------------105690414000740509502118--

		/**
		 * 最后的-- 表示结束吧
		 */
	});
	response.end('success')
}).listen(9000, '127.0.0.1');

console.log('Server running on port 9000.');




/**
 * http 携带的信息，除了header指定的协议字段外，所有负载数据都在body里
 * 例如传递name:zhangsan ,sex:male到后端
 * 当使用post请求时，默认负载采用form-data 编码，后端收到：
 *      ----------------------------105690414000740509502118
		Content-Disposition: form-data; name="name"

		zhangsan	
		----------------------------105690414000740509502118
		Content-Disposition: form-data; name="sex"

		male
		----------------------------105690414000740509502118--
 *
 *当采用x-www-form-urlencoded 编码时，后端收到：
 *name=zhangsan&sex=male
 *
 *当然你也可以发送raw 格式的body：name:zhangsan,sex:male，后端收到
 *name:zhangsan,sex:male
 *然后自己解析。
 *其实raw body很常用，但是每次都要自己解析，于是就把常用的解析编码单独提出来了
 *例如：application/json,text/plain,text/xml等等
 *
 * 最后，也可以发送binary 二进制body，后端按照二进制处理。
 *
 * 其实说白了，所有请求都是一种http请求，你如果愿意，可以让get请求带上body。
 * 就是因为很多请求很有特征，于是提炼出了get，post，put等类型，其实质就是
 * 在header里加了一个字段，来标识一下，然后形成规范，这样很多服务器或者其他
 * 服务商，就可以根据协议来解析请求了。如果你自己发送带body的get请求，那么你自己写的
 * 后端服务器可以解析，其他服务器可能就根据协议，把get请求的body扔掉了。
 *
 *
 *
 *
 *
 * 
 */