const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
  },
  email: {
    type: String,
    required: [true, "A user must have a email"],
    unique: [true, "Email already in use"],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "A user must confirm his password"],
  },
  passwordCreatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
