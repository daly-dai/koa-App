const Router = require("koa-router"); // 路由
const router = new Router(); // 路由对象
const passport = require("koa-passport");

const MerchandiseCategory = require("../../models/MerchandiseCategory");
// 引入模板实例
const Goods = require("../../models/Goods.js");

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
      .populate("apply")
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
    const iconname = ctx.request.body.iconName;
    const admin = ctx.request.body.admin;

    let merchandiseCategoryItem = {};

    if (admin) {
      merchandiseCategoryItem = {
        name,
        status: 2,
        apply: id,
        through: id,
        iconname,
      };
    } else {
      merchandiseCategoryItem = {
        name,
        status: 1,
        apply: id,
        through: "",
        iconname: "",
      };
    }

    console.log(merchandiseCategoryItem, 88888);

    const merchandiseCategoryData = new MerchandiseCategory({
      ...merchandiseCategoryItem,
    });

    await merchandiseCategoryData.save().then((res) => {
      ctx.status = 200;
      ctx.success(res);
    });
  }
);

/**
 * @route GET api/MerchandiseCategory/getAllMerchandiseCategory
 * @description 编辑商品分类
 * @access 私密的接口
 */
router.post(
  "/editMerchandiseCategory",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const MerchandiseCategoryId = ctx.request.body.id;
    const name = ctx.request.body.name;
    const iconname = ctx.request.body.iconName;
    console.log(MerchandiseCategoryId, name, iconname, 88888);

    const merchandiseCategory = await MerchandiseCategory.findByIdAndUpdate(
      { _id: MerchandiseCategoryId },
      {
        $set: {
          name,
          iconname,
        },
      },
      {
        new: true,
      }
    );

    if (!merchandiseCategory) {
      ctx.status = 404;
      ctx.throw(404, "更新失败");
    }

    ctx.status = 200;
    ctx.success("更新成功");
  }
);

/**
 * @route GET api/MerchandiseCategory/getAllMerchandiseCategory
 * @description 获取所有的分类
 * @access 私密的接口
 */
router.post(
  "/deleteMerchandiseCategory",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const id = ctx.request.body.id;
    const goodsList = Goods.updateMany(
      {
        merchandiseCategory: id,
      },
      {
        $set: {
          merchandiseCategory: "60ab9907a7f59325900cc235",
        },
      }
    );
    const merchandiseCategory = await MerchandiseCategory.deleteOne({
      _id: id,
    });

    if (!merchandiseCategory) {
      ctx.status = 404;
      ctx.throw(404, "删除失败");
    }

    ctx.status = 200;
    ctx.success("删除成功");
  }
);

module.exports = router.routes();
