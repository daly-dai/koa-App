const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  user: {
    // 关联数据表
    type: String,
    ref: "users", // 关联属性及其表
    required: true,
  },
  // 自己的头像
  avator: {
    type: String,
  },
  // 自己的id
  from: {
    type: String,
    require: true,
  },
  // 对方的id
  to: {
    type: String,
    require: true,
  },
  // 发送的消息
  message: {
    type: String,
    require: true,
    default: "",
  },
  // 当前状态
  status: {
    type: String,
  },
  time: {
    type: Number,
    require: true,
  },
});

mongoose.model("Chat", chatSchema);
module.exports = {
  getModel: function (name) {
    return mongoose.model(name);
  },
};
