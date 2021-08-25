const express = require("express");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const shortRouter = require("./Routes/shortRoute");
const userRouter = require("./Routes/userRoute");
const cookieParser = require("cookie-parser");

const app = express();

app.enable("trust-proxy");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use((req, res, next) => {
  next();
});

app.use("/api/v2/users", userRouter);
app.use("/api/v2/shorturl", shortRouter);

module.exports = app;
