// 接收到message后
var data=[];
client.on('message', (topic, message) => { 
  console.log('收到来自', topic, '的消息:', message.toString())
  data=message.toString();
  console.log(data);
  // 断开连接
  //client.end()
})