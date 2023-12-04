const { sendSuccess, sendError } = require("../../utils/response");
const ReviewModel = require("./review.model");
class Controller {
  async createReview(req, res, next) {
    const { astrologerID, rating, comment } = req.body;

    try {
      const newReview = await ReviewModel.create({
        userID: req.user._id,
        astrologerID,
        rating,
        comment,
      });

      return sendSuccess(res, { review: newReview }, "review created sucessfully", 200);
    } catch (err) {
      return sendError(next, err.message, 500);
    }
  }
  async findAll(req, res, next) {
    try {
      const reviews = await ReviewModel.find();
      return sendSuccess(res, { reviews });
    } catch (err) {
      return sendError(next, err.message, 500);
    }

  }
  async findById(req, res, next) {
    const { id } = req.params;

    try {
      const review = await ReviewModel.findById(id);
      if (review) {
        return sendSuccess(res, { review });
      } else {
        return sendError(next, "Review not found", 404);
      }
    } catch (err) {
      return sendError(next, err.message, 500);
    }

  }
}

module.exports = new Controller();