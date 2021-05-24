const Router = require("koa-router");
const router = new Router();

const users = require("./users"); // 用户信息相关接口
const profile = require("./profile.js");
const publish = require("./publish.js"); // 发布接口
const reply = require("./reply.js"); // 回复接口
const chat = require("./chat.js"); // 聊天接口
const public = require("./public"); // 公共接口
const goods = require("./goods");
const community = require("./community"); // 社区接口
const merchandiseCategory = require("./merchandiseCategory"); // 商品分类
const test = require("./test");

router.use("/api/users", users);
router.use("/api/profile", profile);
router.use("/api/publish", publish);
router.use("/api/reply", reply);
router.use("/api/chat", chat);
router.use("/api/public", public);
router.use("/api/goods", goods);
router.use("/api/community", community);
router.use("/api/merchandiseCategory", merchandiseCategory);
router.use("/koa-api/test", test);

module.exports = router;
