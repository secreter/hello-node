/**
 * Created by So on 2018/6/15.
 * 记录子进程的标准输出，保存为log文件，区分标准输出和错误输出
 * 类似pm2的日志记录功能
 */
const child_process=require('child_process')
const net =require('net')
function multiplexChannels (sources,destination) {
  let totalChannels=sources.length
  for(let i=0;i<sources.length;i++){
    sources[i]
      .on('readable',()=>{
        let chunk
        while (chunk=sources[i].read()){
          const outBuff=new Buffer(1+4+chunk.length)            //信道号+长度值+数据
          outBuff.writeUInt8(i,0)                               //偏移0的地方写入信道号
          outBuff.writeUInt32BE(chunk.length,1)                 //32位的大端无符号int BE suffix stands for BigEndian
          chunk.copy(outBuff,5)                                 //偏移5的地方拷贝
          console.log(`send packet to channel:${i}.${chunk.toString()}`)
          destination.write(outBuff)                            //写入目的流
        }
      })
      .on('end',()=>{
        if(--totalChannels===0){
          destination.end()                                     //关闭目的流
        }
      })
  }
}

const socket=net.connect(3000,()=>{                            //连接socket端口3000
  const child=child_process.fork(process.argv[2],process.argv.slice(3),{silent:true})     //启动子进程并传递参数
  multiplexChannels([child.stdout,child.stderr],socket)        //将标准输出分为两个信道流入socket
})
