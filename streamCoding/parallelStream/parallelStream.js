/**
 * Created by So on 2018/6/14.
 * 实现无序并行流
 */
const stream =require('stream')
class ParallelStream extends stream.Transform{
  constructor(userTransform) {
    super({objectMode: true})                        //只处理对象
    this.userTransform = userTransform               //用户处理函数
    this.running = 0                                 //运行的任务数量
    this.terminateCallback = null                    //所有任务完成后的通知函数引用
  }
  _transform(chunk,enc,done){
    this.userTransform(chunk,enc,this.push.bind(this),this._onComplete.bind(this))   //本函数里需要有异步操作
    done()                   //会被立即执行，不会等到上面函数执行完毕，并行的关键
    this.running++
  }
  _flush(done){                     //流终止时调用
    if(this.running>0){
      this.terminateCallback=done       //流终止了，但是任务还没有完成，将完成通知函数done保存起来，延时调用
    }else{
      done()
    }
  }
  _onComplete(err){
    this.running--;                      //真正完成一个任务
    if(err){
      return this.emit('error',err)
    }
    if(this.running===0){
      this.terminateCallback&&this.terminateCallback()      //调用最终完成函数
    }
  }

}
module.exports=ParallelStream
