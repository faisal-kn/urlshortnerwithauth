const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);
router.route("/").get(userController.getAllUser);
router
  .route("/deleteme")
  .delete(authController.protect, userController.deleteCurrentUser);

module.exports = router;
