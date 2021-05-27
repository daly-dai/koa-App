const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const replySchema = new Schema({
  goods: {
    type: String,
    ref: "goods",
    required: true,
  },
  replylist: [
    // 回复列表
    {
      // 评价的用户
      user: {
        type: String,
        ref: "users",
        required: true,
      },
      desc: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = Reply = mongoose.model("reply", replySchema);
