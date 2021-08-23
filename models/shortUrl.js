const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  fullUrl: {
    type: String,
    required: [true, "A full url is required"],
    unique: [true, "This url already has a shortUrl"],
  },
  shortUrl: {
    type: String,
    unique: [true, "This shortUrl already exists"],
  },
  clicks: {
    type: Number,
    default: 0,
  },
  willexpireAt: {
    type: Date,
    default: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    expires: 172800,
  },
});

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;
