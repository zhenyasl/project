// CREATE TABLE IF NOT EXISTS Users (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     username VARCHAR(50) NOT NULL,
//     email VARCHAR(100) NOT NULL,
//     password_hash VARCHAR(100) NOT NULL,
//     registration_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     role VARCHAR(20) NOT NULL
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_id: { type: Number, required: false },
    username: { type: String, required: false, maxlength: 50 },
    email: { type: String, required: true },
    password_hash: { type: String, required: false},
    registration_date : { type: Date, default: Date.now },
    role :  { type: String, required: false },
    // saved_threads : {type: String, required: false}
    saved_threads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thread' }] // ссылка на модель Thread
});


const User = mongoose.model('User', userSchema);
module.exports = User;