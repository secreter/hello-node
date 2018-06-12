/*
自定义一个生成随机字符串的可读流
 */
const stream = require('stream')
const Chance = require('chance')
const chance = new Chance()
class RandomStream extends stream.Readable {
  constructor (options) {
    super(options)             // 传递参数
  }
  // 实现_read方法
  _read (size) {
    const chunk = chance.string()
    console.log(`size: ${chunk.length} ${chunk}`)
    this.push(chunk, 'utf8')          // 向缓存中添加数据
    if (chance.bool({likelihood: 5})) {  // 95%的概率终止
      this.push(null)               // 终止流
    }
  }
}

let randomStream = new RandomStream()

randomStream.on('data', (chunk) => {
  console.log(`read ${chunk}`)
}).on('end', _ => console.log('end '))
