const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PublishSchema = new Schema({
    user: {
        // 关联数据表
        type: String,
        ref: "users", // 关联属性及其表
        required: true,
    },
    describe: {
        // 描述
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    province: {
        // 省市区
        type: String,
        required: true
    },
    city: {
        // 省市区
        type: String,
        required: true
    },
    county: {
        // 省市区
        type: String,
        required: true
    },
    
})