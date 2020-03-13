const http = require('http');
const path = require("path");
const Koa = require("koa");
const Router = require("koa-router");
const router = new Router();
const staticServe = require("koa-static");
const ws = require("socket.io");
const app = new Koa();

const server = http.createServer(app.callback())
// 1.把静态页统一放到public中管理
const home = staticServe(path.join(__dirname,"public"))
app.use(home); 

// 2.接口
const hello = ctx => {
  ctx.redirect('/client.html');
  // ctx.response.body = 'Hello World home';
};
// 3.分配路由
router.get('/', hello);

app.use(router.routes()); //4.启动路由

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
});//web服务监听 3000 端口