const { Router } = require("express");
const router = Router();
const authRouter = require("./modules/auth/auth.route");
const userRouter = require("./modules/user/user.route");
const astrologerRouter = require("./modules/astrologer/astrologer.route");




router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/astrologer", astrologerRouter)


module.exports = router;
