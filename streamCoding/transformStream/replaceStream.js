/*
转换流实现字符串查找替换
 */
const stream = require('stream')
const util = require('util')
class ReplaceStream extends stream.Transform {
  constructor (searchStr, repalceStr) {
    super()
    this.searchStr = searchStr        // 要搜索的字符串
    this.repalceStr = repalceStr      // 要替换的字符串
    this.tailPiece = ''               // 最后一块分片
  }
  // 实现方法
  _transform (chunk, encoding, callback) {
    const pieces = (this.tailPiece + chunk).split(this.searchStr)  // 拼接上上一次的最后一片，用searchStr来切割
    const lastPeice = pieces[pieces.length - 1]
    const tailPieceLen = this.searchStr.length - 1  // 最后一块分片的最大长度
    this.tailPiece = lastPeice.slice(-tailPieceLen)
    pieces[pieces.length - 1] = lastPeice.slice(0, -tailPieceLen) // 重新替换数组最后一个元素
    this.push(pieces.join(this.repalceStr))      // 用替换的字符连接，得到本chunk能替换的最大字符串，推进缓存
    callback()
  }
  _flush (callback) {                       // 结束时调用，处理最后一块
    this.push(this.tailPiece)
    callback()
  }

}
module.exports = ReplaceStream
