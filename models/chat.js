const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    user: {
        // 关联数据表
        type: String,
        ref: "users", // 关联属性及其表
        required: true,
    },
    chatIdList: [
        toSokit
    ]
})