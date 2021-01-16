const CustomError = require("./custom-error.js");

module.exports = async (ctx, next) => {
  ctx.custom = {
    error: CustomError,
  };

  await next();
};
