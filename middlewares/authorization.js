const jwt = require("jsonwebtoken");
const UserModel = require("../modules/user/user.model")

async function checkAuth(req, res, next) {
  let token = req.headers["authorization"];
  if (!token) {
    const err = new Error("Auth token missing.");
    err.status = 401;
    return next(err);
  }

  token = token.split(" ")[1];

  const decoded = jwt.decode(token);
  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }

  let user;
  try {
    user = await UserModel.findById(decoded.id)
      .lean()
      .exec();
      // console.log('user', user)
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }
   
  } catch (err) {
    return next(err);
  }

  req.user = user;
  next();
}



module.exports = {
  checkAuth,
};
