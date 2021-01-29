const Router = require("koa-router"); // 路由
const router = new Router(); // 路由对象
const passport = require("koa-passport");



// 引入模板实例
const Publish = require("../../models/publish.js");

const validatePublishInput = require("../../validation/publish.js");


/**
 * @route GET api/publish/test
 * @description 测试的接口
 * @access 公开的接口
 */
router.get('/test', async (ctx) => {
    ctx.status = 200;
    ctx.body = { msg: "publish test" };
})


/**
 * @route GET api/publish/addPublish
 * @description 新增发布商品接口
 * @access 私密的数据
 */
router.post('/addPublish',
    passport.authenticate("jwt", { session: false }),
    async (ctx) => {
        const publishFields = {};
        const data = ctx.request.body;
        const { error, isValid } = validatePublishInput(data);

        if (!isValid) {
            ctx.status = 404;
            ctx.body = error;
            ctx.throw(404, error)
        }

        publishFields.user = ctx.state.user.id;
        for (let item in data) {
            if (item === "images") {
                publishFields[item] = data[item].split(",");
                continue;
            }

            if (data[item]) {
                publishFields[item] = data[item];
            }
        }

        await Publish.create(publishFields).then(res => {
            ctx.status = 200;
            ctx.success(publishFields);
        }).catch((err) => {
            console.log(err);
        })
    }
);


/**
 * @route GET api/publish/getPublish
 * @description 获取当前用户所有的订单
 * @access 私密的数据
 */
router.get('/getPublish',
    passport.authenticate("jwt", { session: false }),
    async (ctx) => {
        const id = ctx.state.user.id;
        const publishList = await Publish.find({ user: id });

        ctx.status = 200;
        ctx.success(publishList);
    }
);


/**
 * @route GET api/publish/getPublishById
 * @description 获取发布商品的详细信息
 * @access 私密的数据
 */
router.get('/getPublishById',
    passport.authenticate("jwt", { session: false }),
    async (ctx) => {
        const userId = ctx.state.user.id;
        const id = ctx.request.body.id;
        const publish = await Publish.findOne({ $or: [{ user: userId }, { id }] });

        if (!publish.id) {
            ctx.status = 404;
            ctx.throw(404, "查无此信息")
        }

        ctx.status = 200;
        ctx.success(publish);
    }
);

/**
 * @route GET api/publish/updatePublish
 * @description 更新订单信息(局部更新)
 * @access 私密的数据
 */
router.post("/updatePublish",
    passport.authenticate("jwt", { session: false }),
    async (ctx) => {
        const publishFields = {};
        const userId = ctx.state.user.id;
        const id = ctx.request.body.id;
        const data = ctx.request.body;
        const publish = await Publish.findOne({ $or: [{ user: userId }, { id }] });

        if (publish.length === 0) {
            ctx.status = 404;
            ctx.fail("更新数据失败", -1);
            ctx.throw(404, "暂无此信息");
        }

        for (let item in data) {
            if (item === "id") continue;

            if (item === "images") {
                publishFields[item] = data[item].split(",");
                continue;
            }

            if (data[item]) {
                publishFields[item] = data[item];
            }
        }

        const updatePublish = await Publish.findByIdAndUpdate(
            { _id: id },
            publishFields,
            { upsert: true, new: true })


        if (!updatePublish) {
            ctx.status = 500;
            ctx.throw(500, "更新失败")
        }

        ctx.status = 200;
        ctx.success("更新成功")


    }
);

/**
 * @route GET api/publish/updatePublishStatus
 * @description 更新订单状态信息(局部更新)
 * @access 私密的数据
 */
router.post('/updatePublishStatus',
    passport.authenticate("jwt", { session: false })
    , async (ctx) => {
        const userId = ctx.state.user.id;
        const id = ctx.body.id;

    }
);

/**
 * @route POST api/publish/deletePublish
 * @description 删除订单数据
 * @access 私密的数据
 */
router.post("/deletePublish",
    passport.authenticate("jwt", { session: false }),
    async (ctx) => {

    }
)




module.exports = router.routes();