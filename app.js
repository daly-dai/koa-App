const koa = require("koa");
const mongoose = require("mongoose");
const bodyParser = require("koa-bodyparser"); // 获取前端传输过来的数据
const router = require("./routes/api/index.js");
const passport = require("koa-passport");

// 实例化koa
const app = new koa();

app.use(bodyParser());

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

app.use(passport.initialize());
app.use(passport.session());

// 回调到config文件中的passport.js
require("./config/passport")(passport);

// 配置路由
app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`selever started on ${port}`);
});
