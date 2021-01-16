const validator = require("validator");
const isEmpty = require("./is-empty.js");

module.exports = function validateRegisterInput(data) {
  let error = {};

  if (!validator.isLength(data.name, { min: 2, max: 16 })) {
    error.name = "名字的长度不能小于两位且不能超过十六位";
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};
