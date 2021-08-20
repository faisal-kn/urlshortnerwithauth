const express = require("express");
const urlController = require("../controllers/urlController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .post(authController.protect, urlController.createUrl)
  .get(urlController.getAllUrl);

router.route("/:shortUrl").get(authController.protect, urlController.getUrl);

module.exports = router;
