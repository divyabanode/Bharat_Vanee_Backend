const { sendSuccess, sendError } = require("../../utils/response");
const consultationModel = require("./consultation.model");
class Controller {
  async create(req, res, next) {
    const { _id } = req.user;
    const { AstrologerID, Date, Duration, Time, Type, Status } = req.body
    let account;
    try {
      let data = {
        AstrologerID, Date, Duration, Time, Type, Status, userId: _id
      }
      account = await consultationModel.create(data);
      if (account) {
        return sendSuccess(res, { account });
      }
    } catch (err) {
      return next(err);
    }
  }
  getUsersAllConsultations = async (req, res, next) => {
    try {
      const { _id } = req.user
      let consultation = await consultationModel.find({ id: _id }).populate('AstrologerID');
      if (consultation.lenght > 0) {
        return sendSuccess(res, consultation, "All consultation by User");
      } else {
        return sendError(next, "user consultation not exist");
      }
    } catch (err) {
      return next(err);
    }

  };
  async findById(req, res, next) {
    const { id } = req.params;
    let account;
    try {
      account = await UserModel.findById(id);
      if (account) {
        return sendSuccess(res, { account });
      } else {
        return sendError(next, "some is wrong");
      }
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new Controller();