/**
 * Created by So on 2018/6/16.
 */
const net=require("net")
const fs=require("fs")
function demultiplexChannel (source ,destinations) {
  let currentChannel=null
  let currentLength=null
  source
    .on("readable",()=>{
      let chunk
      if(currentChannel===null){
        chunk=source.read(1)                          //读取一个字节，判断信道号
        currentChannel=chunk&&chunk.readUInt8(0)
      }
      if(currentLength===null){
        chunk=source.read(4)
        currentLength=chunk.readUInt32BE(0)           //读取数据长度
        if (currentLength===null){
          return
        }
      }
      chunk=source.read(currentLength)
      if (chunk===null){
        return
      }
      console.log('received packet from :'+currentChannel)
      destinations[currentChannel].write(chunk)
      currentChannel=null                           //置空
      currentLength=null
    })
    .on('end',()=>{
      destinations.forEach((destination)=>destination.end())
      console.log('end')
    })
}
net.createServer(socket=>{
  const stdoutStream=fs.createWriteStream('stdout.txt')
  const stderrStream=fs.createWriteStream('stderr.txt')
  demultiplexChannel(socket,[stdoutStream,stderrStream])
}).listen(3000,()=>console.log('server start'))
