const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../models/user');

router.post('/register', async (req, res) => {
    console.log("I'm in registration!!!");
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res
                .status(400)
                .send('Please provide username, email, and password');
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).send('User already exists');
        }

         const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password_hash: hashedPassword,
            role: 'user',
        });
            
        await newUser.save();
        res.status(201).send('User registered successfully');
            
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// router.get('/register', (req, res) => {
//     res.send('Hello from registration');
// });

module.exports = router;
