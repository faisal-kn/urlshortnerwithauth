const express = require("express");
const cookieparser = require("cookie-parser");
const shortRouter = require("./Routes/shortRoute");
const userRouter = require("./Routes/userRoute");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/v2/users", userRouter);
app.use("/api/v2/shorturl", shortRouter);

module.exports = app;
