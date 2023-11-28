const { sendSuccess, sendError } = require("../../utils/response");
const { uploadImageToS3 } = require("../images/images.controller");
const astrologerModel = require("./astrologer.model");
class Controller {
  async createAstrologer(req, res, next) {
    const { _id } = req.user;
    const { email, name, bio, phone_number, specialization, YearsOfExperience, Rating } = req.body;
    let account;
    try {
      if (!email || !name || !phone_number || !specialization || !YearsOfExperience || !Rating || !bio) {
        return sendError(next, "please fill all fields", 401);
      }
      let data = await astrologerModel.findById(_id)
      if (data) {
        let img = await uploadImageToS3(process.env.AWS_S3_BUCKET, req.file.originalname, req.file.buffer);
        let user = { ...req.body, image: img, phone_number: data.phone_number }
        account = await astrologerModel.findByIdAndUpdate(_id, user, { new: true })
        return sendSuccess(res, account, "Astrologer updated  successfully");
      } else {
        return sendError(next, "astrologer not exist", 400)
      }
    } catch (err) {
      return res.status(404).send('internal server error');
    }
  }

  async getallAstrologers(req, res, next) {
    let account;
    try {
      account = await astrologerModel.find();
      if (account) {
        return sendSuccess(res, account, "Astrologers Data");
      } else {
        return sendError(next, "something is wrong", 400)
      }
    } catch (err) {
      return res.status(404).send('internal server error');
    }
  }

  async getAstrologerById(req, res, next) {
    let account;
    try {
      account = await astrologerModel.findOne({ _id: req.params.id });
      if (account) {
        return sendSuccess(res, account, "Astrologers Data");
      } else {
        return sendError(next, "something is wrong", 400)
      }
    } catch (err) {
      return res.status(404).send('internal server error');
    }
  }




}

module.exports = new Controller();