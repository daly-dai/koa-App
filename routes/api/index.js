const Router = require("koa-router");
const router = new Router();
const users = require("./users");
const profile = require("./profile.js");

router.use("/api/users", users);
router.use("/api/profile", profile);

module.exports = router;
