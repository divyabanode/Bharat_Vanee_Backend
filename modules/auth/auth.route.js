const { Router } = require("express");
const router = Router();
const controller = require("./auth.controller");

router
  .route("/sendOTP")
  .post(controller.sendOTP);


router
  .route("/register")
  .post(controller.register)

router
  .route("/login")
  .post(controller.verifyOTP);

router
  .route("/registerAdmin")
  .post(controller.registerAdmin);

router
  .route("/loginAdmin")
  .post(controller.loginAdmin);

module.exports = router;
