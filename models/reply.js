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
            // 评价的用户
            user: {
                type: String
            },
            // 评论id
            id: {
                type: String,
            },
            desc: {
                type: String,
                required: true
            },
            // 父节点id
            partantId: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now,
            }
        }
    ]
});

module.exports = Reply = mongoose.model('reply', replySchema);
