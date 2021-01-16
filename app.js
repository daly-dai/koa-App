const koa = require("koa");
const mongoose = require("mongoose");
const bodyParser = require('koa-bodyparser'); // 获取前端传输过来的数据
const router = require('./routes/api/index.js');

// 实例化koa
const app = new koa();

app.use(bodyParser());

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

// 配置路由
app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`selever started on ${port}`);
});
