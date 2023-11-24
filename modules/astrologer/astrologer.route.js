const { Router } = require("express");
const controller = require("./astrologer.controller");
const router = Router();

router.route("/createAstrologer").post(controller.createAstrologer);
router.route("/getallAstrologers").get(controller.getallAstrologers)
router.get("/getAstrologerById/:id",controller.getAstrologerById)

module.exports = router;
