const Router = require("koa-router"); // 路由
const router = new Router(); // 路由对象
const passport = require("koa-passport");

// 引入模板实例
const Profile = require("../../models/profile.js");

/**
 * @route GET api/profile/test
 * @description 测试接口地址
 * @access 公开的接口
 */
router.get("/test", async (ctx) => {
  ctx.status = 200;
  ctx.body = { msg: "profile test" };
});

/**
 * @route GET api/profile
 * @description 获取个人信息接口
 * @access 私密的
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const profile = await Profile.find({
      user: ctx.state.user.id,
    }).populate("user", ["name", "avatar"]);

    if (profile.length === 0) {
      ctx.status = 404;
      ctx.body = "无该用户信息";

      ctx.throw(404, "无该用户信息");
    }

    ctx.status = 200;
    ctx.body = profile;
  }
);

/**
 * @route GET api/profile
 * @description 添加和编辑个人信息接口
 * @access 私密的
 */
router.post(
  "/addAndupdate",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const profileFields = { social: {} };
    const data = ctx.request.body;

    profileFields.user = ctx.state.user.id;

    if (data.handle) {
      profileFields.handle = data.handle;
    }

    if (data.company) {
      profileFields.company = data.company;
    }

    if (data.website) {
      profileFields.website = data.website;
    }

    if (data.location) {
      profileFields.location = data.location;
    }

    if (data.status) {
      profileFields.status = data.status;
    }

    if (data.status) {
      profileFields.bio = data.bio;
    }

    if (data.githubusername) {
      profileFields.githubusername = data.githubusername;
    }

    // 数组转换
    if (typeof data.skills !== "undefined") {
      profileFields.skills = data.skills.split(",");
    }

    if (data.githubusername) {
      profileFields.githubusername = data.githubusername;
    }

    if (data.wechat) {
      profileFields.social.wechat = data.social.wechat;
    }

    if (data.QQ) {
      profileFields.social.QQ = data.social.QQ;
    }

    if (data.tengxunkt) {
      profileFields.social.tengxunkt = data.social.tengxunkt;
    }

    if (data.wangyikt) {
      profileFields.social.wangyikt = data.social.wangyikt;
    }

    // 查询数据库
    const profile = await Profile.find({ user: ctx.state.user.id });

    if (profile.length > 0) {
      // 更新数据
      const profileUpdate = await Profile.findOneAndUpdate(
        { user: ctx.state.user.id },
        { $set: profileFields },
        { new: true }
      );

      ctx.body = profileUpdate;

      ctx.status = 200;
    } else {
      await new Profile(profileFields).save().then((profile) => {
        ctx.status = 200;
        ctx.body = profile;
      });
    }
  }
);

module.exports = router.routes();
