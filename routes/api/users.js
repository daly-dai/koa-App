const Router = require("koa-router"); // 路由
const router = new Router(); // 路由对象
const bcrypt = require("bcryptjs"); // 对密码进行加密
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken"); // 生成token
const passport = require("koa-passport");

// 引入user
const User = require("../../models/User");
// const { v1: uuidv1 } = require('uuid');

// 引入验证
const validateRegisterInput = require("../../validation/registrer");
const validateLoginInput = require("../../validation/login.js");

/**
 * @route GET api/users/text
 * @description 测试接口地址
 * @access 公开的接口
 */
router.get("/test", async (ctx) => {
  ctx.status = 200;
  ctx.body = { msg: "users test" };
});

/**
 * @route POST api/users/register
 * @description 注册接口地址
 * @access 公开的接口
 */
router.post("/register", async (ctx) => {
  const data = ctx.request;
  console.log(data);
  const { error, isValid } = validateRegisterInput(data.body);

  if (!isValid) {
    ctx.status = 404;
    ctx.body = error;
    ctx.throw(404, error);
  }

  // 数据库查询
  const findResult = await User.find({ email: data.body.email });

  if (findResult.length > 0) {
    ctx.status = 404;
    ctx.body = { email: "邮箱已被占用" };

    ctx.throw(500, "邮箱已被占用");
  }

  const newUser = new User({
    name: ctx.request.body.name,
    email: ctx.request.body.email,
    password: ctx.request.body.password,
  });

  // 密码加密
  await new Promise((resolve) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) reject(err);

        newUser.password = hash;
        resolve();
      });
    });
  });

  // 存儲到存储到数据库
  await newUser
    .save()
    .then((user) => {
      ctx.status = 200;
      ctx.success(user);
    })
    .catch((err) => {
      console.log(err);
    });
});

/**
 * @route post api/users/login
 * @description 登录接口 返回token
 * @public 公开的接口
 */
router.post("/login", async (ctx) => {
  const data = ctx.request.body;
  const { error, isValid } = validateLoginInput(data);
  console.log(data, 67676767676);
  if (!isValid) {
    ctx.status = 404;
    ctx.body = error;

    ctx.throw(404, error);
  }

  //  查询登录的邮箱是否存在
  const findResult = await User.find({ email: data.email });

  if (!findResult.length) {
    ctx.status = 400;
    ctx.body = { email: "用户不存在" };

    ctx.throw(400, "用户不存在");
  }

  // 验证密码
  let result = await bcrypt.compareSync(data.password, findResult[0].password);

  // 验证通过
  if (!result) {
    ctx.status = 400;
    ctx.body = { email: "用户名或者密码错误" };
    ctx.throw(404, "用户名或者密码错误");
  }

  const payload = {
    id: findResult[0].id,
    name: findResult[0].name,
    email: findResult[0].email,
  };
  const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 * 7 });
  const refToken = jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 * 6 });

  ctx.status = 200;
  const resData = {
    token: "Bearer " + token,
    refToken: "Bearer " + refToken,
    ...payload,
  };

  ctx.body = { success: true, mesg: "处理成功", code: "0000", data: resData };
});

/**
 * @route GET api/users/editUserData
 * @description 编辑当前用户信息
 * @access 私密的
 */
router.post(
  "/editUserData",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const id = ctx.state.user.id;
    const data = ctx.request.body;

    const userData = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          avatar: data.avatar,
          name: data.name,
          community: data.community,
          sex: data.sex,
        },
      },
      {
        new: true,
      }
    );

    if (!userData.name) {
      ctx.status = 404;
      ctx.throw(404, "更新失败");
    }

    delete userData.password;

    ctx.status = 200;
    ctx.success(userData);
  }
);

/**
 * @route GET api/users/getUserList
 * @description 获取用户列表
 * @access 私密的
 */
router.get(
  "/getUserList",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const list = {
      pageSize: "",
      pageNum: "",
      total: "",
      totalPage: "",
      records: [],
    };

    list.pageNum = ctx.request.query.current;
    list.pageSize = ctx.request.query.size || 5;

    const userList = await User.find({});

    list.total = userList.length;
    list.totalPage = userList.length / list.pageSize;

    list.records = await User.find({})
      .populate("community")
      .skip((list.pageNum - 1) * parseInt(list.pageSize))
      .limit(parseInt(list.pageSize));

    ctx.status = 200;
    ctx.success(list);
  }
);

/**
 * @route GET api/users/deleteUserById
 * @description 删除用户
 * @access 私密的
 */
router.post(
  "/deleteUserById",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const userId = ctx.request.body.userId;
    await User.deleteOne({ _id: userId });

    ctx.status = 200;
    ctx.success("删除成功");
  }
);

module.exports = router.routes();
