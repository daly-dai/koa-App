const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const goodsSchema = new Schema({
  // 卖方
  seller: {
    type: String,
    ref: "users",
    require: true,
  },
  // 卖方名称
  sellername: {
    type: String,
    require: true,
  },
  // 买方名称
  buyername: {
    type: String,
  },
  // 买方的头像
  buyeravatar: {
    type: String,
  },
  // 买方
  buyer: {
    type: String,
  },
  goodsname: {
    type: String,
    required: true,
  },
  imgs: {
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
  // '0出售' '1已拍下', '2待发货', '3待收货', '4已收货', '5待评价'
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

module.exports = Goods = mongoose.model("Goods", goodsSchema);
