const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const shortRouter = require("./Routes/shortRoute");
const userRouter = require("./Routes/userRoute");
const AppError = require("./AppError");
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

app.use("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  console.log(err);
  res.status(statusCode).json({
    status: "error",
    message: statusCode === 500 ? "Something went wrong" : message,
  });
});

module.exports = app;
