const Router = require("koa-router");
const router = new Router();

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

module.exports = router.routes();
