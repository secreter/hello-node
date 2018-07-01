/**
 * 实现一个定长队列，并且按key存储object
 * @param max
 * @returns {Map<any, any>}
 */
function getFixLengthMapQueue (max=100) {
  let map=new Map()
  let _set=map.set.bind(map)
  map.set=function(k,v) {
    if(map.size<max){
      _set(k,v)
      return
    }
    //有序迭代，插入的顺序
    for (let key of map.keys()){
      map.delete(key)
      _set(k,v)
      return
    }
  }
  return map
}
let m=getFixLengthMapQueue(3)

m.set('1',1)
m.set('2',2)
m.set('3',3)
m.set('4',4)
m.set('5',5)
console.log(m)