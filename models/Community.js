const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 实例化数据模板
const communitySchema = new Schema({
  name: {
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

module.exports = community = mongoose.model("community", communitySchema);
