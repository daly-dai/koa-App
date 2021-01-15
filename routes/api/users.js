const Router = require("koa-router");
const router = new Router();
const bcrypt = require('bcryptjs');

// 引入user
const User = require('../../models/User')
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

  // 存储到数据库
  const findResult = await User.find({ email: ctx.request.body.email });

  if (findResult.length > 0) {
    ctx.status = 500;
    ctx.body = { 'email': '邮箱已被占用' }
  } else {
    const newUser = new User({
      name: ctx.request.body.name,
      email: ctx.request.body.email,
      password: ctx.request.body.password
    });

    await new Promise(resolve => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) reject(err);

          newUser.password = hash;
          console.log(hash);
          resolve();
        });
      })
    });

    // 存儲到存储到数据库
    await newUser.save().then(user => {
      ctx.body = user
    }).catch(err => {
      console.log(err);
    })
  }
});


module.exports = router.routes();
