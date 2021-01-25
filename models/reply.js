const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const replySchema = new Schema({
    publish: {
        type: String,
        ref: 'publish',
        required: true
    },
    replyList: [ // 回复列表
        {
            user: {
                type: String
            },
            id: {
                type: String,
            },
            partantId: {
                type: String
            },
            form: {
                type: String
            },
            to: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now,
            },
        }
    ]
})