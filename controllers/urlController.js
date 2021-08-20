const Url = require("../models/shortUrl");

exports.createUrl = async (req, res, next) => {
  try {
    const url = await Url.create(req.body);
    res.status(200).json({ status: "success", data: { url } });
  } catch (err) {
    res.json({ status: "failed", error: err });
  }
};
