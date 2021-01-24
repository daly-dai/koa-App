const validator = require("validator");
const isEmpty = require("./is-empty.js");

module.exports = function validatePublishInput(data) {
    let error = {};

    data.describe = !isEmpty(data.describe) ? data.describe : "";
    data.images = !isEmpty(data.images) ? data.images : "";
    data.province = !isEmpty(data.province) ? data.province : "";
    data.city = !isEmpty(data.city) ? data.city : "";
    data.county = !isEmpty(data.county) ? data.county : "";
    data.degree = !isEmpty(data.degree) ? data.degree : "";
    data.originalPrice = !isEmpty(data.originalPrice) ? data.originalPrice : "";
    data.presentPrice = !isEmpty(data.presentPrice) ? data.presentPrice : "";
    data.freightWay = !isEmpty(data.freightWay) ? data.freightWay : "";


    if (validator.isEmpty(data.describe)) {
        error.describe = "商品描述不能为空";
    }

    if (data.images.length === 0) {
        error.images = "商品图片不能为空";
    }

    if (validator.isEmpty(data.province) || validator.isEmpty(data.city) || validator.isEmpty(data.county)) {
        error.address = "发货地址不能为空";
    }

    if (validator.isEmpty(data.degree)) {
        error.address = "成色不能为空";
    }

    if (validator.isEmpty(data.originalPrice)) {
        error.originalPrice = "原价不能为空";
    }

    if (validator.isEmpty(data.presentPrice)) {
        error.originalPrice = "价格不能为空";
    }

    return {
        error,
        isValid: isEmpty(error),
    }

}