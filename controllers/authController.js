const User = require("../models/user");
const jwt = require("jsonwebtoken");

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

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email and Password not provided");
    }
    const user = await User.findOne({ email: email }).select('+password');
    console.log(user);
    if (!user || !(await user.checkPassword(password, user.password)))
      throw new Error("Incorrect email or password.");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
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
