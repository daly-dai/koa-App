const Router = require("koa-router"); // 路由
const router = new Router(); // 路由对象
const passport = require("koa-passport");

// 引入模板实例
const Reply = require("../../models/reply.js");
// 引入模板实例
// const Goods = require("../../models/Goods.js");

const { v1: uuidv1 } = require("uuid");

/**
 * @route GHE api/reply/test
 * @description 测试接口
 */
router.get("/test", async (ctx) => {
  ctx.status = 200;
  ctx.body = "reply test";
});

/**
 * @route POST api/reply/addPublishReply
 * @description 添加订单回复
 * @access 私密的数据
 */
router.post(
  "/addPublishReply",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const userName = ctx.state.user.name;
    const publishId = ctx.body.publishId;
    const id = ctx.body.id;

    const publish = await Publish.find({ publish: publishId });

    if (!publish) {
      ctx.status = 404;
      ctx.body = "订单信息有误";
      ctx.throw(404, "订单信息有误");
    }

    const reply = await Reply.find({ publish: publishId });

    // 如果没有评论，则新增数据
    if (!reply) {
      const data = {
        publish: publishId,
        replyList: [
          {
            user: userName,
            id: uuidv1(),
            partantId: null,
            desc: ctx.body.desc,
          },
        ],
      };

      await Reply.create(data).then((res) => {
        ctx.status = 200;
        ctx.success(publishFields);
      });
    } else {
      const replyItem = {
        user: userName,
        id: uuidv1(),
        partantId: id,
        desc: ctx.body.desc,
      };

      await Reply.update(
        {
          publish: publishId,
        },
        {
          $push: { replyList: replyItem },
        }
      ).then((res) => {
        ctx.status = 200;
        ctx.success(publishFields);
      });
    }
  }
);

/**
 * @route POST api/publish/addPublishReply
 * @description 添加订单回复
 * @access 私密的数据
 */
router.post(
  "/addGoodsReply",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const userId = ctx.state.user.id;
    const goods = ctx.request.body.goods;
    const desc = ctx.request.body.desc;

    const goodsList = await Reply.find({ goods: goods });

    if (goodsList.length > 0) {
      await Reply.updateOne(
        { goods: goods },
        { $push: { replylist: { user: userId, desc: desc } } }
      );

      ctx.status = 200;
      ctx.success("新增成功");
    } else {
      const reply = new Reply({
        goods: goods,
        replylist: [
          {
            user: userId,
            desc: desc,
          },
        ],
      });

      await reply
        .save()
        .then((reply) => {
          ctx.status = 200;
          ctx.success(reply);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
);

/**
 * @route POST api/publish/addPublishReply
 * @description 获取订单
 * @access 私密的数据
 */
router.get(
  "/getReplyList",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const userId = ctx.state.user.id;
    const goods = ctx.request.query.goods;
    const goodsList = await Reply.find({ goods: goods }).populate(
      "replylist.user"
    );

    if (goodsList.length) {
      const replyList = goodsList[0].replylist || [];
      const list = [];
      replyList.map((item) => {
        if (item.user._id.toString() === userId.toString()) {
          list.push(item);
        }
      });

      ctx.status = 200;
      ctx.success(list);
    } else {
      ctx.status = 200;

      ctx.success(goodsList);
    }
  }
);

module.exports = router.routes();
