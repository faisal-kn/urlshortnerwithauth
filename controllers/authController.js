const User = require("../models/user");

exports.signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });
    res.status(200).json({
      status: "success",
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
