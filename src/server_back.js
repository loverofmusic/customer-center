const http = require("http");
const fs = require("fs");
const ws = require("socket.io");

const server = http.createServer((req, res) => {
  const html = fs.readFileSync("./client.html");
  res.end(html);
}); //创建一个web服务器

const io = ws(server); //基于当前的web服务，开启socket实例

//检测连接事件
io.on("connection", (socket)=>{
  console.log("当前有用户连接聊天室");
  //接受客户端所发送的信息
  socket.on("message", (mes)=>{
    //向所有客户端广播发布的消息
    console.log(mes)
    io.emit("broadcast message", mes)
  })
})
server.listen(3000, () => {
  console.log("server is running at port 3000");
}); //web服务监听 3000 端口
