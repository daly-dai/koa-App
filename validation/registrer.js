const validator = require("validator");
const isEmpty = require("./is-empty.js");

module.exports = function validateRegisterInput(data) {
  let error = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!validator.isLength(data.name, { min: 2, max: 16 })) {
    error.name = "名字的长度不能小于两位且不能超过十六位";
  }

  if (validator.isEmpty(data.name)) {
    error.name = "用户名不能为空";
  }

  if (validator.isEmpty(data.email)) {
    error.email = "邮箱不能为空";
  }

  if (!validator.isEmail(data.email)) {
    error.email = "邮箱不合法";
  }

  if (validator.isEmpty(data.password)) {
    error.password = "密码不能为空";
  }

  if (!validator.isLength(data.password, { min: 6, max: 16 })) {
    error.password = "密码的长度不能小于六位且不能超过十六位";
  }

  // if (validator.isEmpty(data.password2)) {
  //   error.password2 = "密码不能为空";
  // }

  // if (!validator.equals(data.password, data.password2)) {
  //   error.password2 = "两次输入的密码不匹配";
  // }

  return {
    error,
    isValid: isEmpty(error),
  };
};
