const { Router } = require("express");
const { checkAuth } = require("../../middlewares/authorization");
const controller = require("./user.controller");
const router = Router();

router.route("/updateUser").put(checkAuth, controller.updateOne);
router.route("/findAll").get( controller.findAll);
router.route("/find/:id").get(checkAuth, controller.findById);

module.exports = router;
