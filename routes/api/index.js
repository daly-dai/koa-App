const Router = require("koa-router");
const router = new Router();

const users = require("./users"); // 用户信息相关接口
const menu = require("./menu");
const publish = require("./publish.js"); // 发布接口
const public = require("./public"); // 公共接口
const goods = require("./goods");
const community = require("./community"); // 社区接口

router.use("/api/users", users);
router.use("/api/menu", menu);
router.use("/api/publish", publish);
router.use("/api/public", public);
router.use("/api/goods", goods);
router.use("/api/community", community);

module.exports = router;
