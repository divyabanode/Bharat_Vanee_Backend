const { Router } = require("express");
const controller = require("./astrologer.controller");
const router = Router();
const multer =require('multer');
const upload = multer();

router.route("/createAstrologer").post(upload.single('images', 20),controller.createAstrologer);
router.route("/getallAstrologers").get(controller.getallAstrologers)
router.get("/getAstrologerById/:id",controller.getAstrologerById)

module.exports = router;
