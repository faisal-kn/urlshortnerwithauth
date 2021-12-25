const User = require("../models/user");

exports.getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ status: "success", data: { users } });
  } catch (err) {
    res.status(401).json({ status: "failed", error: err });
  }
};

exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.find({ _id: req.user.id });

    res.status(200).json({ status: "success", data: { user: user } });
  } catch (err) {
    res.status(401).json({ status: "failed", error: err });
  }
};

exports.deleteCurrentUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { active: false });
    res.status(204).json({});
  } catch (err) {
    res.status(401, { status: "failed", err });
  }
};
