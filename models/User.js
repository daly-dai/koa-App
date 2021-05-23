const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 实例化数据模板
const UserSchema = new Schema({
  // 用户名
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  sex: {
    type: String,
  },
  scoketId: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // 所属的社区
  community: {
    type: String,
    ref: "community",
    required: true,
  },
  // 是否为管理员
  isAdmin: {
    type: Boolean,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
