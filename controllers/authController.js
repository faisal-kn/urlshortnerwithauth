const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const cookieOptions = {
      expires: new Date(Date.now() + process.env.AUTH_COOKIE_EXPIRES_IN),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.cookie("auth", token, cookieOptions);

    res.status(200).json({
      status: "success",
      token,
      data: { newUser },
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: "failed",
      error: err,
    });
  }
};

exports.logout = (req, res) => {
  res.cookie("auth", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email and Password not provided");
    }
    const user = await User.findOne({ email: email }).select("+password");
    if (!user || !(await user.checkPassword(password, user.password)))
      throw new Error("Incorrect email or password.");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const cookieOptions = {
      expires: new Date(Date.now() + process.env.AUTH_COOKIE_EXPIRES_IN),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.cookie("auth", token, cookieOptions);

    res.status(200).json({
      status: "success",
      token,
      data: { user },
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: "failed",
      error: err,
    });
  }
};

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.auth) {
    token = req.cookies?.auth;
  }
  if (!token) {
    throw new Error("You are not logged in . Please log in to get access");
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);
  if (!user)
    throw new Error(
      "User belonging to this token has been deleted from our database"
    );
  req.user = user;
  res.locals.user = user;
  next();
};
