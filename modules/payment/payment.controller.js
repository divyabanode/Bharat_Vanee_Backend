const { sendSuccess, sendError } = require("../../utils/response");
const UserModel = require("../user/user.model");
class Controller {
  async updateOne(req, res, next) {
    const { _id } = req.user;
    let account;
    try {
      account = await UserModel.findByIdAndUpdate(_id, req.body, { new: true }).populate("image");
      if (req.body.gender === "Women") {
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 30);
        await UserModel.findByIdAndUpdate(_id, {
          paid: true,
          active_plan: {
            plan: "6447800358b5d4a28059e443",
            start: new Date(),
            end: expiry,
            active: true,
            trialing: false,
          },
        })
      }
    } catch (err) {
      return next(err);
    }
    return sendSuccess(res, { account });
  }
  getRecommendation = async (req, res, next) => {
    if (!req.files.length > 0) {
      return sendError(next, "Payload not found", 400);
    }
    const { _id } = req.user;
    let associatedUser = await UserModel.findOne({ _id }).lean();

    if (!associatedUser) {
      return sendError(next, "user does not exist");
    }
    let uploadRes;
    let keys = []
    let locations = []
    let originalnames = []
    for (let file of req.files) {
      try {
        uploadRes = await uploadS3Wrapper(file);
        keys.push(uploadRes.key)
        locations.push(uploadRes.location)
        originalnames.push(uploadRes.originalname)
        console.log(uploadRes, "originalname")
      } catch (err) {
        return next(err);
      }
    }
    let newUpload;
    try {
      newUpload = await uploadModel.create({ originalname: originalnames, bucket: uploadRes.Bucket, key: keys, location: locations });
    } catch (err) {
      return next(err);
    }

    let prevApplicant;
    try {
      prevApplicant = await UserModel.findByIdAndUpdate(associatedUser._id, {
        image: newUpload._id,
      })
        .populate("image")
        .lean();
    } catch (err) {
      return next(err);
    }
    sendSuccess(res, newUpload);


  };
  findById = async (req, res, next) => {
    const { id } = req.params;
    const associatedApplicant = await UserModel.findById({ _id: userId })
      .lean()
      .exec();
    if (!associatedApplicant) {
      return sendError(next, "User does not exist", 401);
    }
    try {
      await uploadModel.updateOne(
        { _id: associatedApplicant.image },
        { $pull: { location: url } }
      );
    } catch (err) {
      return next(err);
    }
    sendSuccess(res, { message: "image removed" });
  };
  Like = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { url } = req.body;
    const associatedApplicant = await UserModel.findById({ _id: userId })
      .lean()
      .exec();
    if (!associatedApplicant.video) {
      return sendError(next, "video does not exist", 401);
    }
    try {
      await uploadModel.deleteOne({ _id: associatedApplicant.video });
      await UserModel.findByIdAndUpdate({ _id: userId }, { video: null })
    } catch (err) {
      return next(err);
    }
    sendSuccess(res, { message: "video removed" });
  }
 
}

module.exports = new Controller();