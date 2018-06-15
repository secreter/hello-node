/**
 * Created by So on 2018/6/14.
 * 使用并行流来检查url状态，可以监控网页状态或去除数据中死链
 * node checkUrls.js urls.txt
 */
const fs=require('fs')
const split=require('split')            //将文件中的每一行作文数据块输出
const request=require('request')
const ParallelStream=require('./parallelStream')
fs.createReadStream(process.argv[2])
  .pipe(split())                     //每行为一个数据块
  .pipe(new ParallelStream((url,enc,push,done)=>{
    if(!url) return done()
    request.head(url,(err,response)=>{
      push(url+'is '+(err?'down':'up')+'\n')
      done()
    })
    })
  ).pipe(fs.createWriteStream('result.txt'))
  .on('finish',_=>console.log('success!'))
