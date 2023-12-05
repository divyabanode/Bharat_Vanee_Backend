const { Router } = require("express");
const router = Router();
const multer = require('multer');
const upload = multer();
const controller = require("./auth.controller");
const { checkAuth } = require("../../middlewares/authorization");

router
  .route("/sendOTP")
  .post(controller.sendOTP);

router
  .route("/sendOTPAstrologer")
  .post(controller.sendOTPAstrologer);

router
  .route("/login")
  .post(controller.verifyOTP);

router
  .route("/loginAstrologer")
  .post(controller.verifyOTPAstrologer);
router
  .route("/register")
  .post(upload.single('images', 20), checkAuth, controller.register)


router
  .route("/registerAdmin")
  .post(upload.single('images', 20), controller.registerAdmin);

router
  .route("/loginAdmin")
  .post(controller.loginAdmin);

module.exports = router;
