const Router = require("koa-router");
const router = new Router();
const users = require("./users");


router.use("/api/users", users);

module.exports = router;
