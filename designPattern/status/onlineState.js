/*
* 在线时候的策略
* */
module.exports=class OnlineState {
  constructor (failsafeSocket){
    this.failsafeSocket=failsafeSocket
  }
  //在线状态直接发送
  send(data){
    this.failsafeSocket.socket.write(data)
  }
  //离线恢复在线的时候发送队列里的数据
  activate(){
    this.failsafeSocket.queue.forEach(data=>{
      this.failsafeSocket.socket.write(data)
    })
    this.failsafeSocket.queue=[]
    this.failsafeSocket.socket.once('error',()=>{
      this.failsafeSocket.changeState('offline')
    })
  }
}