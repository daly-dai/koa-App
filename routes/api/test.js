const Router = require("koa-router"); // 路由
const router = new Router(); // 路由对象

/**
 * @route GET api/test/madeTest
 * @description 测试接口地址
 * @access 公开的接口
 */
router.post("/madeTest", async (ctx) => {
  const data = ctx.request.body;
  console.log("请求接口", data);
  ctx.status = 200;
  ctx.body = { msg: "goods test" };
});

module.exports = router.routes();
