const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_id: { type: Number, required: false },
    username: { type: String, required: false, maxlength: 50 },
    email: { type: String, required: true },
    password_hash: { type: String, required: false },
    registration_date: { type: Date, default: Date.now },
    role: { type: String, required: false },
    // saved_threads : {type: String, required: false}
    saved_threads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thread" }],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
