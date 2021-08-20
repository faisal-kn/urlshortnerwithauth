const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
  },
  email: {
    type: String,
    required: [true, "A user must have a email"],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
  },
  confirmPassword: {
    type: String,
    required: [true, "A user must confirm his password"],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
