const express = require("express");
const shortRouter = require("./Routes/shortRoute");
const userRouter = require("./Routes/userRoute");

const app = express();

app.use("/api/v2/users", userRouter);
app.use("/api/v2/shorturl", shortRouter);

module.exports = app;
