const mongoose = require("mongoose");
const ReviewSchema = new mongoose.Schema(
  {
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      astrologerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Astrologer',
        required: true
      },
      rating: {
        type: String,
        required: true
      },
      comment: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  
);

ReviewSchema.index({
  phone_number: 1,
});


module.exports = mongoose.model("Review", ReviewSchema);
