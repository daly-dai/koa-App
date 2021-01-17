const validator = require("validator");
const isEmpty = require("./is-empty.js");

module.exports = function validateProfileInput(data) {
  let error = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!validator.isLength(data.handle, { min: 2, max: 16 })) {
    error.handle = "handle的长度不能小于两位且不能超过十六位";
  }

  if (validator.isEmpty(data.handle)) {
    error.handle = "handle不能为空";
  }

  if (!validator.isLength(data.status, { min: 2, max: 16 })) {
    error.status = "status的长度不能小于两位且不能超过十六位";
  }

  if (validator.isEmpty(data.status)) {
    error.status = "status不能为空";
  }

  if (validator.isEmpty(data.skills)) {
    error.skills = "skills不能为空";
  }

  // if (!validator.isEmpty(data.website || !validator.isURL(data.website))) {
  //   error.website = "URL不合法";
  // }

  return {
    error,
    isValid: isEmpty(error),
  };
};
