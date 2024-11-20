const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    thread_id: { type: String, required: true },
    user_id: { type: Number, required: false },
    username: { type: String, required: false, maxlength: 50 },
    content: { type: String, required: true },
    post_date: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
