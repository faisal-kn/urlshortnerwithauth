const express = require("express");
const urlController = require("../controllers/urlController");

const router = express.Router();

router.route("/").post(urlController.createUrl).get(urlController.getAllUrl);

router.route("/:shortUrl").get(urlController.getUrl);

module.exports = router;
