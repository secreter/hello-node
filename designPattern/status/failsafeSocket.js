/**
 * 创建一个安全的客户端套接字，当和服务端失去连接的时候不会丢失数据，而是存储在队列尝试重连
 */
const OfflineState=require('./offineState')
const OnlineState=require('./onlineState')

class FailsafeSocket {
  constructor (options){
    this.options=options
    this.queue=[]
    this.socket=null
    this.currentState=null
    this.states={
      offline:new OfflineState(this),
      online:new OnlineState(this),
    }
    this.changeState('offline')

  }
  changeState(state){
    console.log('Activeing state :'+state)
    this.currentState=this.states[state]
    this.currentState.activate()
  }
  send(data){
    this.currentState.send(data)
  }

}
module.exports=options=>{
  return new FailsafeSocket(options)
}