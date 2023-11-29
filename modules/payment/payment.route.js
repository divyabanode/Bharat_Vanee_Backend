const { Router } = require("express");
const { checkAuth } = require("../../middlewares/authorization");
const controller = require("./payment.controller");
const router = Router();

router.route("/create").put(checkAuth, controller.updateOne);
router.route("/find/:id").get(checkAuth, controller.findById);
router.route("/recommendation").post(checkAuth,controller.getRecommendation)
router.route("/like/:id").get(checkAuth, controller.Like)

module.exports = router;
