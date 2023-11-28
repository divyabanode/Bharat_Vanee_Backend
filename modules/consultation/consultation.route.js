const { Router } = require("express");
const { checkAuth } = require("../../middlewares/authorization");
const controller = require("./consultation.controller");
const router = Router();

router.route("/create").post(checkAuth, controller.create);
router.route("/getUsersAllConsultations").get(checkAuth, controller.getUsersAllConsultations)
router.route("/find/:id").get(checkAuth, controller.findById);


module.exports = router;
