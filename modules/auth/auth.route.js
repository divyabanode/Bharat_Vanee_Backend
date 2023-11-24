const { Router } = require("express");
const router = Router();
const controller = require("./auth.controller");

router
  .route("/sendOTP")
  .post(controller.sendOTP);
router
  .route("/verifyOTP")
  .post(controller.verifyOTP);

router
  .route("/loginMobile")
  .post(controller.loginMobile);

router.route("/register").post(controller.register)
module.exports = router;
