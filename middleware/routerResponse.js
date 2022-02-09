function routerResponse(option = {}) {
  return async function (ctx, next) {
    ctx.success = function (data) {
      ctx.type = option.type || "json";
      ctx.body = {
        code: option.successCode || "000000",
        msg: option.successMsg || "success",
        data: data,
      };

      ctx.response.status = 200;
    };

    ctx.fail = function (msg, code) {
      ctx.type = option.type || "json";
      ctx.body = {
        code: code || option.failCode || -1,
        msg: msg || option.successMsg || "fail",
      };

      ctx.response.status = ctx.status;
    };

    await next();
  };
}

module.exports = routerResponse;
