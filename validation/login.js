const validator = require("validator");
const isEmpty = require("./is-empty.js");

module.exports = function validateLoginInput(data) {
  let error = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isEmail(data.email)) {
    error.name = "邮箱不合法";
  }

  if (validator.isEmpty(data.email)) {
    error.name = "邮箱不能为空";
  }

  if (!validator.isLength(data.password, { min: 6, max: 16 })) {
    error.password = "密码的长度不能小于六位且不能超过十六位";
  }

  if (validator.isEmpty(data.password)) {
    error.password = "密码不能为空";
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};
