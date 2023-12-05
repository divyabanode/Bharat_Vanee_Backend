const { Router } = require("express");
const router = Router();
const authRouter = require("./modules/auth/auth.route");
const userRouter = require("./modules/user/user.route");
const astrologerRouter = require("./modules/astrologer/astrologer.route");

const consultationRouter = require("./modules/consultation/consultation.route");
const reviewRouter = require("./modules/review/review.route");





router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/astrologer", astrologerRouter)
router.use("/consultation", consultationRouter)
router.use("/review", reviewRouter)



module.exports = router;
