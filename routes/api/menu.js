const Router = require("koa-router"); // 路由
const router = new Router(); // 路由对象
const passport = require("koa-passport");

const keys = require("../../config/keys");

/**
 * @route GET api/users/text
 * @description 测试接口地址
 * @access 公开的接口
 */
router.get("/test", async (ctx) => {
  ctx.status = 200;
  ctx.body = { msg: "menu test" };
});

/**
 * @description 获取权限树相关的数据
 */
router.get(
  "/getAuthTree",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const data = [
      {
        id: "1",
        name: "test",
        children: [],
      },
    ];

    // 手动延迟两秒返回
    setTimeout(() => {
      ctx.status = 200;
      ctx.success(data);
    }, 2000);
  }
);

module.exports = router.routes();
