/**
 * 创建一个安全的客户端套接字，当和服务端失去连接的时候不会丢失数据，而是存储在队列尝试重连
 */
const OfflineState=require('./offineState')
const onState=require('./onlineState')