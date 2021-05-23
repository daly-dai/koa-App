const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 实例化数据模板
const merchandiseCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  // 图标名称
  iconName: {
    type: String,
    required: true,
  },
  // 1、申请中 2、使用中 3、下架中
  status: {
    type: String,
    required: true,
  },
  // 申请人
  apply: {
    type: String,
    required: true,
  },
  // 通过
  through: {
    type: String,
  },
});

module.exports = merchandiseCategory = mongoose.model(
  "merchandiseCategory",
  merchandiseCategorySchema
);
