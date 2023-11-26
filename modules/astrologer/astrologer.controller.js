const { sendSuccess, sendError } = require("../../utils/response");
const { uploadImageToS3 } = require("../images/images.controller");
const astrologerModel = require("./astrologer.model");
class Controller {
  async createAstrologer(req, res, next) {
    const { email, name, bio, phone_number, specialization, YearsOfExperience, Rating } = req.body;
    console.log('req.body', req.body)
    let account;
    try {
      if (!email || !name || !phone_number || !specialization || !YearsOfExperience || !Rating || !bio) {
        console.log('account',)
        return sendError(next, "please fill all fields", 401);
      }
      let img = await uploadImageToS3(process.env.AWS_S3_BUCKET, req.file.originalname, req.file.buffer);
      let user = { ...req.body, image: img }
      let data = await new astrologerModel(user);
      account = data.save()
      if (account) {
        return sendSuccess(res, data, "Astrologer is created");
      } else {
        return sendError(next, "something is wrong", 400)
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