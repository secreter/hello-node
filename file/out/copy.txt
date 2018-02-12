/**
 * 抓取网页中的所有图片
 * @type {[type]}
 */
var https=require('https')
var path=require('path')
var fs=require('fs')
var {URL} = require('url')
var req=https.request('https://lai.yuweining.cn/pic.html',(response)=>{
	
	// console.log(response)
	// for(let k in response){
	// 	console.log(k)
	// }

	//https://cnodejs.org/topic/4faf65852e8fb5bc65113403
	let bufferList=[],body=null
	//回调函数只有一个参数，二进制数据
	response.on('data',(chunk)=>{
		//准备好要拼接的buff
		bufferList.push(chunk)
	})
	response.on('end',(err,chunk)=>{
		body=Buffer.concat(bufferList).toString('utf8')
		let list=getImgUrls(body)
		list.map(url=>{
			downloadImg(url)
		})
		// console.log(body)
		console.log('end')
	})
})
req.end()


const getImgUrls=(str)=>{
	let reg=/http(s):\/\/(\S+)\.(jpg|png|gif)/g
	let list=str.match(reg)
	console.log(list)
	return list
}
const downloadImg=(url)=>{
	https.request(url,(res)=>{
		let filename='./download/'+getFileName(url)
		// fs.writeFileSync(filename, '');
		//不能创建文件吗
		let stream = fs.createWriteStream(filename)
		res.pipe(stream)
	}).end()
}
const getFileName=(url)=>{
	let u=new URL(url)
	return u.pathname.split('/').pop()
}