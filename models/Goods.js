const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const goodsSchema = new Schema({
  // 卖方
  seller: {
    type: String,
    ref: "users",
    require: true,
  },
  // 买方
  buyer: {
    type: String,
  },
  goodsname: {
    type: String,
    required: true,
  },
  img: {
    type: Array,
  },
  price: {
    type: Number,
    required: true,
  },
  avatar: {
    type: String,
    ref: "users",
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  // 商品状态
  goodsstatus: {
    type: Number,
    required: true,
  },
  // 磨损程度
  attritionrate: {
    type: String,
    require: true,
  },
  // 商品类别
  merchandiseCategory: {
    type: Number,
    require: true,
  },
});

mongoose.model("Goods", goodsSchema);
module.exports = {
  getModel: function (name) {
    return mongoose.model(name);
  },
};
