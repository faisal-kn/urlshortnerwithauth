const Url = require("../models/shortUrl");
const { nanoid } = require("nanoid");

exports.createUrl = async (req, res, next) => {
  try {
    if (!req.body.shortUrl) req.body.shortUrl = nanoid(8);

    const url = await Url.create(req.body);
    res.status(200).json({ status: "success", data: { url } });
  } catch (err) {
    res.json({ status: "failed", error: err });
  }
};

exports.getAllUrl = async (req, res, next) => {
  try {
    const allUrl = await Url.find();
    res.status(200).json({ status: "success", data: { allUrl } });
  } catch (err) {
    res.json({ status: "failed", error: err });
  }
};

exports.getUrl = async (req, res, next) => {
  try {
    const url = await Url.findOne({ shortUrl: req.params.shortUrl });
    url.clicks++;
    await url.save();
    res.status(200).json({ status: "success", data: { url } });
  } catch (err) {
    res.json({ status: "failed", error: err });
  }
};
