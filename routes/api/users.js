const Router = require("koa-router"); // 路由
const router = new Router(); // 路由对象
const bcrypt = require("bcryptjs"); // 对密码进行加密
const gravatar = require("gravatar"); // 获取全球邮箱的头像

// 引入user
const User = require("../../models/User");
/**
 * @route GET api/users/text
 * @description 测试接口地址
 * @access 公开的接口
 */
router.get("/test", async (ctx) => {
  ctx.status = 200;
  ctx.body = { msg: "users test" };
});

/**
 * @route POST api/users/registrer
 * @description 注册接口地址
 * @access 公开的接口
 */
router.post("/registrer", async (ctx) => {
  const data = ctx.request;

  // 存储到数据库
  const findResult = await User.find({ email: data.body.email });

  if (findResult.length > 0) {
    ctx.status = 404;
    ctx.body = { email: "邮箱已被占用" };

    ctx.throw(500, "邮箱已被占用");
  }

  // 获取全球邮箱的头像
  const avatar = gravatar.url(data.body.email, { s: "200", r: "pg", d: "mm" });
  const newUser = new User({
    name: ctx.request.body.name,
    email: ctx.request.body.email,
    avatar,
    password: ctx.request.body.password,
  });

  // 密码加密
  await new Promise((resolve) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) reject(err);

        newUser.password = hash;
        resolve();
      });
    });
  });

  // 存儲到存储到数据库
  await newUser
    .save()
    .then((user) => {
      ctx.body = user;
    })
    .catch((err) => {
      console.log(err);
    });
});

/**
 * @route post api/users/login
 * @description 登录接口 返回token
 * @public 公开的接口
 */
router.post("/login", async (ctx) => {
  const data = ctx.request.body;
  //  查询登录的邮箱是否存在
  const findResult = await User.find({ email: data.email });

  if (!findResult.length) {
    ctx.status = 400;
    ctx.body = { email: "用户不存在" };

    ctx.throw(400, "用户不存在");
  }

  // 验证密码
  let result = await bcrypt.compareSync(data.password, findResult[0].password);

  // 验证通过
  if (!result) {
    ctx.status = 400;
    ctx.body = { email: "用户名或者密码错误" };

    ctx.throw(404, "用户名或者密码错误");
  }

  ctx.status = 200;
  ctx.body = { success: true };
});

module.exports = router.routes();
