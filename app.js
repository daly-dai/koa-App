const koa = require("koa");
const cors = require('koa2-cors');
const mongoose = require("mongoose");
const bodyParser = require("koa-bodyparser"); // 获取前端传输过来的数据
const router = require("./routes/api/index.js");
const passport = require("koa-passport");
const errorHandler = require("./middleware/errorHandler");
const routerResponse = require("./middleware/routerResponse.js");

// 实例化koa
const app = new koa();
// socket 链接
const io = require("socket.io")(server);

app.use(bodyParser());

// 设置跨域
app.use(cors());

// config
const dbURL = require("./config/keys").mongoURI;
// 链接数据库
mongoose
  .connect(dbURL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("mongodb is connecting");
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.set('useFindAndModify', false)


// 统一的错误处理
errorHandler(app);

// 统一封装返回数据格式
app.use(routerResponse()); 
// 对平台的token进行统一的校验
app.use(passport.initialize());
app.use(passport.session());


io.on('connection', socket => {
  const socketId = socket.id;

  // 登录
  socket.on('login')
})

// 回调到config文件中的passport.js
require("./config/passport")(passport);

// 配置路由
app.use(router.routes()).use(router.allowedMethods());

// 配置跨域
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*")
  ctx.set("Access-Control-Allow-Headers", "authorization")
  await next()
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`selever started on ${port}`);
});
