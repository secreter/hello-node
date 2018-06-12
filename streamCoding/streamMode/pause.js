/*
非流动模式的流，数据准备好的时候会触发readable事件
通过read(size)方法来读取，有可能一次读不完，读完之后再次读取返回null
size是每次读取的大小，字符数
 */
process.stdin
  .on('readable', () => {
    let chunk
    console.log('new data available')
    while ((chunk = process.stdin.read()) !== null) {
      console.log(`chunk read: (${chunk.length}) {${chunk.toString()}}`)
    }
  })
  .on('end', () => {
    process.stdout.write('End of stream')
  })
