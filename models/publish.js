const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PublishSchema = new Schema({
  user: {
    // 关联用户的数据表
    type: String,
    ref: "users", // 关联属性及其表
    required: true,
  },
  describe: {
    // 描述
    type: String,
    required: true,
  },
  // 商品类别
  merchandiseCategory: {
    type: Number,
    require: true,
  },
  images: {
    // 商品图片
    type: Array,
    required: true,
  },
  province: {
    // 省市区
    type: String,
    required: true,
  },
  city: {
    // 省市区
    type: String,
    required: true,
  },
  county: {
    // 省市区
    type: String,
    required: true,
  },
  degree: {
    // 新旧程度
    type: Number,
    required: true,
  },
  originalPrice: {
    // 原价
    type: Number,
    required: true,
  },
  presentPrice: {
    // 现价
    type: Number,
    required: true,
  },
  freightWay: {
    // 运费计算方式
    type: Number,
    required: true,
  },
});

module.exports = Publish = mongoose.model("publish", PublishSchema);
