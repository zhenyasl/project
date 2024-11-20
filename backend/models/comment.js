const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    post_id: { type: String, required: false },
    replied_id : {type: String, required: false},
    replied_title : {type: String, required: false},
    user_id: { type: String, required: false },
    username: { type: String, required: false, maxlength: 50 },
    content: { type: String, required: true },
    post_date: { type: Date, default: Date.now }
});


const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
