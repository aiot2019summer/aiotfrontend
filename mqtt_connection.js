// WebSocket 连接字符串
const WebSocket_URL = 'ws://127.0.0.1:8083/mqtt'

// 连接选项
const options = {
      // 超时时间
      connectTimeout: 4000,
      // 认证信息
      clientId: 'emqx',
      // username: 'emqx',
      // password: 'emqx',

      // 心跳时间
      keepalive: 60,
      clean: true,
}
const client = mqtt.connect(WebSocket_URL, options)

// 连接成功后初始化订阅
client.on('connect', () => {
   // console.log('Connected to', WebSocket_URL)
    // 订阅主题
    client.subscribe('hello', (err) => {
      //console.log(err || '订阅成功')
    })
 
  })