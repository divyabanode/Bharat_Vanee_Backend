const { Router } = require("express");
const { checkAuth } = require("../../middlewares/authorization");
const controller = require("./review.controller");
const router = Router();

router.route("/createReview").post(checkAuth, controller.createReview);
router.route("/findAll").get(checkAuth, controller.findAll);
router.route("/find/:id").get(checkAuth, controller.findById);

module.exports = router;
