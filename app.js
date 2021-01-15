const koa = require("koa");
const Router = require("koa-router");
const mongoose = require("mongoose");
const bodyParser = require('koa-bodyparser'); // 获取前端传输过来的数据

// 实例化koa
const app = new koa();
const router = new Router();

app.use(bodyParser());

// 路由
router.get("/", async (ctx) => {
  ctx.body = { msg: "hello koa interfaces" };
});

// 引入 users.js
const users = require("./routes/api/users");

// config
const dbURL = require("./config/keys").mongoURI;
// 链接数据库
mongoose
  .connect(dbURL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("mongodb is connecting");
  })
  .catch((err) => {
    console.log(err, 12121212);
  });

// 配置路由地址
router.use("/api/users", users);
// 配置路由
app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`selever started on ${port}`);
});
