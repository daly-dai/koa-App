const Router = require("koa-router");
let router = new Router();
// const mongoose = require("mongoose");
const Chat = require("../../models/chat.js");
const passport = require("koa-passport");

/**
 * @description 获取最新当前用户的聊天列表
 */
router.get(
  "/getMsgList",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    console.log(ctx);
    const data = ctx.request.url.split();

    const chatList = await Chat.find({ from: data.from, to: data.to });

    ctx.status = 200;
    ctx.success(publishFields);
  }
);

router.post(
  "/savePrivateMessage",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const data = ctx.body;

    await Chat.create(data).then((res) => {
      ctx.status = 200;
      ctx.success("保存成功");
    });
  }
);

router.post("/saveSocketId", async (ctx) => {});

module.exports = router.routes();
