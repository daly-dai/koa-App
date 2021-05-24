const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 实例化数据模板
const merchandiseCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  // 图标名称
  iconname: {
    type: String,
  },
  // 1、申请中 2、使用中 3、下架中
  status: {
    type: String,
    ref: "users",
    required: true,
  },
  // 申请人
  apply: {
    type: String,
    ref: "users",
    required: true,
  },
  // 通过
  through: {
    type: String,
  },
});

module.exports = MerchandiseCategory = mongoose.model(
  "merchandiseCategory",
  merchandiseCategorySchema
);
