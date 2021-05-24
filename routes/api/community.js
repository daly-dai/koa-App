const Router = require("koa-router"); // 路由
const router = new Router(); // 路由对象
const passport = require("koa-passport");

const Community = require("../../models/Community");

/**
 * @route GET api/community/text
 * @description 测试接口地址
 * @access 公开的接口
 */
router.get("/test", async (ctx) => {
  ctx.status = 200;
  ctx.body = { msg: "community test" };
});

/**
 * @route GET api/community/getCommunity
 * @description 获取所有正在使用中的社区
 * @access 私密的接口
 */
router.get("/getCommunity", async (ctx) => {
  const communityList = await Community.find({ status: 2 });

  ctx.status = 200;
  ctx.success(communityList);
});

/**
 * @route GET api/community/getAllCommunity
 * @description 获取所有的社区
 * @access 私密的接口
 */
router.get(
  "/getAllCommunity",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const communityList = await Community.find();

    ctx.status = 200;
    ctx.success(communityList);
  }
);

/**
 * @route GET api/community/getAllCommunity
 * @description 获取所有的社区
 * @access 私密的接口
 */
router.get(
  "/getAllCommunityByPage",
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

    const communityList = await Community.find();

    list.total = communityList.length;
    list.totalPage = communityList.length / list.pageSize;

    list.records = await Community.find({})
      .populate("apply")
      .skip((list.pageNum - 1) * parseInt(list.pageSize))
      .limit(parseInt(list.pageSize));

    ctx.status = 200;
    ctx.success(list);
  }
);

/**
 * @route GET api/community/applyCommunity
 * @description 申请新的社区
 * @access 私密的接口
 */
router.post(
  "/applyCommunity",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const id = ctx.state.user.id;
    const name = ctx.request.body.name;
    const admin = ctx.request.body.admin;

    let communityItem = {};

    if (admin) {
      communityItem = {
        name,
        status: 2,
        apply: id,
        through: id,
      };
    } else {
      communityItem = {
        name,
        status: 1,
        apply: id,
        through: "",
      };
    }

    const communityData = new Community({ ...communityItem });

    await communityData.save().then((res) => {
      ctx.status = 200;
      ctx.success(res);
    });
  }
);

/**
 * @route GET api/community/editCommunity
 * @description 修改社区名称
 * @access 私密的接口
 */
router.post(
  "/editCommunity",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const communityId = ctx.request.body.communityId;
    const communityName = ctx.request.body.name;
    const status = ctx.request.body.status;
    const community = await Community.findByIdAndUpdate(
      { _id: communityId },
      {
        $set: {
          name: communityName,
          status,
        },
      },
      {
        new: true,
      }
    );

    if (!community) {
      ctx.status = 404;
      ctx.throw(404, "更新失败");
    }

    ctx.status = 200;
    ctx.success("更新成功");
  }
);

/**
 * @route GET api/community/deleteCommunity
 * @description 删除相关的社区
 * @access 私密的接口
 */
router.post(
  "/deleteCommunity",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const communityId = ctx.request.body.communityId;
    const community = await Community.deleteOne({ _id: communityId });

    if (!community) {
      ctx.status = 404;
      ctx.throw(404, "删除失败");
    }

    ctx.status = 200;
    ctx.success("删除成功");
  }
);

module.exports = router.routes();
