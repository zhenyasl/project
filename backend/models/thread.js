const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const threadSchema = new Schema({
    thread_id: { type: Number, required: false },
    user_id: { type: Number, required: false },
    username: { type: String, required: false, maxlength: 50 },
    content: { type: String, required: true },
    post_date: { type: Date, default: Date.now },
});

const Thread = mongoose.model("Thread", threadSchema);
module.exports = Thread;
