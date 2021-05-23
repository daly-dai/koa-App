const Router = require("koa-router"); // 路由
const router = new Router(); // 路由对象
const passport = require("koa-passport");

const MerchandiseCategory = require("../../models/MerchandiseCategory");

/**
 * @route GET api/MerchandiseCategory/text
 * @description 测试接口地址
 * @access 公开的接口
 */
router.get("/test", async (ctx) => {
  ctx.status = 200;
  ctx.body = { msg: "MerchandiseCategory test" };
});

/**
 * @route GET api/MerchandiseCategory/getMerchandiseCategory
 * @description 获取所有正在使用中的社区
 * @access 私密的接口
 */
router.get("/getMerchandiseCategory", async (ctx) => {
  const MerchandiseCategoryList = await MerchandiseCategory.find({ status: 2 });

  ctx.status = 200;
  ctx.success(MerchandiseCategoryList);
});

/**
 * @route GET api/MerchandiseCategory/getAllMerchandiseCategory
 * @description 获取所有的社区
 * @access 私密的接口
 */
router.get(
  "/getAllMerchandiseCategory",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const MerchandiseCategoryList = await MerchandiseCategory.find();

    ctx.status = 200;
    ctx.success(MerchandiseCategoryList);
  }
);

/**
 * @route GET api/MerchandiseCategory/getAllMerchandiseCategory
 * @description 获取所有的社区
 * @access 私密的接口
 */
router.get(
  "/getAllMerchandiseCategoryByPage",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const list = {
      pageSize: "",
      pageNum: "",
      total: "",
      totalPage: "",
      records: [],
    };

    list.pageNum = ctx.request.query.current;
    list.pageSize = ctx.request.query.size || 5;

    const MerchandiseCategoryList = await MerchandiseCategory.find();

    list.total = MerchandiseCategoryList.length;
    list.totalPage = MerchandiseCategoryList.length / list.pageSize;

    list.records = await MerchandiseCategory.find({})
      .skip((list.pageNum - 1) * parseInt(list.pageSize))
      .limit(parseInt(list.pageSize));

    ctx.status = 200;
    ctx.success(list);
  }
);

/**
 * @route GET api/MerchandiseCategory/applyMerchandiseCategory
 * @description 申请新的社区
 * @access 私密的接口
 */
router.post(
  "/applyMerchandiseCategory",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const id = ctx.state.user.id;
    const name = ctx.request.body.name;
    const admin = ctx.request.body.admin;

    let MerchandiseCategoryItem = {};

    if (admin) {
      MerchandiseCategoryItem = {
        name,
        status: 2,
        apply: id,
        through: id,
      };
    } else {
      MerchandiseCategoryItem = {
        name,
        status: 1,
        apply: id,
        through: "",
      };
    }

    const MerchandiseCategoryData = new MerchandiseCategory({
      ...MerchandiseCategoryItem,
    });

    await MerchandiseCategoryData.save().then((res) => {
      ctx.status = 200;
      ctx.success(res);
    });
  }
);

/**
 * @route GET api/MerchandiseCategory/getAllMerchandiseCategory
 * @description 获取所有的社区
 * @access 私密的接口
 */
router.post(
  "/editMerchandiseCategory",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const MerchandiseCategoryId = ctx.request.query.MerchandiseCategoryId;
    const name = ctx.request.query.name;
    const status = ctx.request.query.status;

    const MerchandiseCategory = MerchandiseCategory.findByIdAndUpdate(
      { id: MerchandiseCategoryId },
      {
        $set: {
          name,
          status,
        },
      },
      {
        new: true,
      }
    );

    if (!MerchandiseCategory.name) {
      ctx.status = 404;
      ctx.throw(404, "更新失败");
    }

    ctx.status = 200;
    ctx.success("更新成功");
  }
);

/**
 * @route GET api/MerchandiseCategory/getAllMerchandiseCategory
 * @description 获取所有的社区
 * @access 私密的接口
 */
router.post(
  "/deleteMerchandiseCategory",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const MerchandiseCategoryId = ctx.request.query.MerchandiseCategoryId;

    const MerchandiseCategory = MerchandiseCategory.findByIdAndUpdate(
      { id: MerchandiseCategoryId },
      {
        $set: {
          name,
          status,
        },
      },
      {
        new: true,
      }
    );

    if (!MerchandiseCategory.name) {
      ctx.status = 404;
      ctx.throw(404, "更新失败");
    }

    ctx.status = 200;
    ctx.success("更新成功");
  }
);

module.exports = router.routes();
