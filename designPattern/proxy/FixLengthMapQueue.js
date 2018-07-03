/**
 * 实现一个定长队列，并且按key存储object
 * @param max
 * @returns {Map<any, any>}
 */
//  function getFixLengthMapQueue (max=100) {
//   let map=new Map()
//   let _set=map.set.bind(map)
//   map.set=function(k,v) {
//     if(map.size<max){
//       _set(k,v)
//       return
//     }
//     //有序迭代，插入的顺序
//     for (let key of map.keys()){
//       map.delete(key)
//       _set(k,v)
//       return
//     }
//   }
//   map.toString()
//   return map
// }
// let m=getFixLengthMapQueue(3)
//
// m.set('1',1)
// m.set('2',2)
// m.set('3',3)
// m.set('4',4)
// m.set('5',5)
// console.log(m)
// console.log(JSON.stringify(m))
export default class FixLengthMapQueue extends Map{
  constructor (array,max=100){
    if(Number.isInteger(array)){
      max=array
      array=undefined
    }
    super()
    this.init(array,max)
  }
  init(array,max){
    this.max=max
    let len=(array||[]).length
    if(len===0) return
    let last =array[len-1]
    if(Number.isInteger(last)){
      this.max=last
      array.pop()
    }
    for(let [k,v] of array){
      this.set(k,v)
    }
  }
  set(k,v){
    if(this.size<this.max){
      super.set(k,v)
      return
    }
    // 有序迭代，插入的顺序
    for (let key of this.keys()){
      this.delete(key)
      super.set(k,v)
      return
    }
  }
  toString(){
    let list=[]
    for (let [k,v] of this.entries()){
      list.push([k,v])
    }
    list.push(this.max)
    return JSON.stringify(list)
  }
}

// let m=new FixLengthMapQueue([["3",3],["4",4],["5",5],3])
// m.set('1',1)
// m.set('2',2)
// // m.set('3',3)
// // m.set('4',4)
// // m.set('5',5)
// console.log(m)
// console.log(m.toString())
// console.log(m.get('2'))