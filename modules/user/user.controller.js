const { sendSuccess, sendError } = require("../../utils/response");
const UserModel = require("../user/user.model");
class Controller {
  async updateOne(req, res, next) {
    const { _id } = req.user;
    let account;
    try {
      account = await UserModel.findByIdAndUpdate(_id, req.body, { new: true })
      if (account) {
        return sendSuccess(res, { account });
      } else {
        sendError(next, "user does not exist", 400)
      }
    }
    catch (err) {
      return next(err);
    }
  }
  async findAll(req, res, next) {
    let account;
    try {
      account = await UserModel.find();
      if (account) {
        return sendSuccess(res, { account });
      } else {
        sendError(next, "user does not exist", 400)
      }
    }
    catch (err) {
      return next(err);
    }
  }
}

module.exports = new Controller();