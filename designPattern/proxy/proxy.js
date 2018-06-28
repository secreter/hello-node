/**
 * Created by So on 2018/6/16.
 * 代理模式
 * 实现一个代理函数，可以代理一个对象的所有属性和方法，只需传递需要代理的属性和对象就行
 */
function proxy (obj,handler) {
  let p={}
  for(let key in obj){
    if(typeof obj[key]==='function'){
      p[key]=obj[key].bind(p)
    }else{
      p[key]=obj[key]                                       //只考虑了基本数据类型，对象需要深度克隆
    }
  }
  for(let key in handler){
    if(typeof handler[key]==='function'){
      p[key]=handler[key].bind(p,p[key])                   //新方法覆盖原方法，并将原方法作为第一个参数传递
    }else{
      p[key]=handler[key]
    }
  }
  return p
}

let person={
  name:'so',
  say(){
    console.log('I am '+this.name)
  }
}
person.say()
let pPerson=proxy(person,{
  name:'redream',
  country:'China',
  say(self){
    console.log('I come from proxy!')
    self()                                                     //调用被代理的方法本身
    console.log('I am in '+this.country)
  }
})
pPerson.say()