const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

router.post("/login", async (req, res) => {
    console.log("I'm in login!!!");
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("Please provide email and password");
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).send("Invalid credentials");
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (isMatch) {
            const token = jwt.sign(
                { email: email, id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: "10h" }
            );
            console.log(token);
            return res.json(token);
        } else {
            res.status(401).send("Invalid credentials");
        }
    } catch (err) {
        res.status(500).send("Server error");
    }
});

module.exports = router;
