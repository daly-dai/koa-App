const Router = require("koa-router"); // 路由
const router = new Router(); // 路由对象
const passport = require("koa-passport");

// 引入模板实例
const Goods = require("../../models/Goods.js");

/**
 * @route GET api/profile/test
 * @description 测试接口地址
 * @access 公开的接口
 */
router.get("/test", async (ctx) => {
  ctx.status = 200;
  ctx.body = { msg: "goods test" };
});

/**
 * @route GET api/profile/addGoods
 * @description 测试接口地址
 * @access 私密的接口
 */
router.post(
  "/addGoods",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const data = ctx.request.body;
    const imgs = data.imgs.split(",");

    const goodsItem = {
      seller: ctx.state.user.id,
      buyer: "",
      goodsname: data.goodsname,
      img: imgs,
      price: data.price,
      avatar: data.avatar,
      desc: data.desc,
      attritionrate: data.attritionrate,
      goodsstatus: 0,
      merchandiseCategory: data.merchandiseCategory,
    };

    await new Goods(goodsItem).save().then((goods) => {
      ctx.status = 200;
      ctx.success(goods);
    });
  }
);

/**
 * @route GET api/publish/getGoods
 * @description 获取当前用户所有的订单
 * @access 私密的数据
 */
router.get(
  "/getGoods",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const id = ctx.state.user.id;
    const publishList = await Goods.find({ seller: id });

    ctx.status = 200;
    ctx.success(publishList);
  }
);

/**
 * @route GET api/publish/getGoodsById
 * @description 获取发布商品的详细信息
 * @access 私密的数据
 */
router.get(
  "/getGoodsById",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const userId = ctx.state.user.id;
    const id = ctx.request.body.id;
    const goods = await Goods.findOne({ $or: [{ seller: userId }, { id }] });

    if (!goods.id) {
      ctx.status = 404;
      ctx.throw(404, "查无此信息");
    }

    ctx.status = 200;
    ctx.success(goods);
  }
);

/**
 * @route GET api/publish/updateGoodsStatus
 * @description 更新订单状态信息(局部更新)
 * @access 私密的数据
 */
router.post(
  "/updateGoodsStatus",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const userId = ctx.state.user.id;
    const id = ctx.body.id;
  }
);

module.exports = router.routes();
