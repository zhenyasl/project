require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("./routes/post-routes");
const threadRoutes = require("./routes/thread-routes");
const commentRoutes = require("./routes/comment-routes");
const userRoutes = require("./routes/user-routes");
const cors = require("cors");
const path = require("path");
//const db = require('./database');
const registerRouter = require("./services/auth/register");
const loginRouter = require("./services/auth/login");

const PORT = 3000;
const URL = "mongodb+srv://kotekit04:112358@cluster0.wn2fn.mongodb.net/pr";

const app = express();
app.use(express.json());

mongoose
    .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log("Connected to MongoDB"))
    .catch((err) => console.log(`DB connection error: ${err}`));

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`listening port ${PORT}`);
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());
app.use("/auth", registerRouter);
app.use("/auth", loginRouter);

app.use(postRoutes);
app.use(threadRoutes);
app.use(commentRoutes);
app.use(userRoutes);
