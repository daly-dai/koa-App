const Router = require("koa-router");
const router = new Router();
const users = require("./users");
const profile = require("./profile.js");
const publish = require("./publish.js");
const reply = require("./reply.js");
const chat = require("./chat.js");

router.use("/api/users", users);
router.use("/api/profile", profile);
router.use("/api/publish", publish);
router.use("/api/reply", reply);
router.use("/api/chat", chat);

module.exports = router;
