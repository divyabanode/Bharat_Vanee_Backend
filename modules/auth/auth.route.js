const { Router } = require("express");
const router = Router();
const multer =require('multer');
const upload = multer();
const controller = require("./auth.controller");

router
  .route("/sendOTP")
  .post(controller.sendOTP);

  router
    .route("/login")
    .post(controller.verifyOTP);

router
  .route("/register")
  .post(upload.single('images', 20),controller.register)


router
  .route("/registerAdmin")
  .post(upload.single('images', 20),controller.registerAdmin);

router
  .route("/loginAdmin")
  .post(controller.loginAdmin);

module.exports = router;
