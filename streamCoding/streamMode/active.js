/*
为data事件添加监听器激活流动模式，不需要主动读取
 */
process.stdin
  .on('data', (chunk) => {
    console.log('new data available')
    console.log(`chunk read: (${chunk.length}) {${chunk.toString()}}`)
  })
  .on('end', () => {
    process.stdout.write('End of stream')
  })
