const Router = require("koa-router");
const router = new Router();
const users = require("./users");
const profile = require("./profile.js");
const publish = require("./publish.js");
const reply = require("./reply.js")

router.use("/api/users", users);
router.use("/api/profile", profile);
router.use("/api/publish", publish);
router.use("/api/reply", reply);

module.exports = router;
