const mongoose = require("mongoose");

// - ConsultationID (Primary Key)
//  - UserID (Foreign Key from Users Table)
//  - AstrologerID (Foreign Key from Astrologers Table)
// Date
// - Time
// - Duration
// - Type (Phone, Chat, Video, etc.)
// - Status (Scheduled, Completed, Cancelled, etc.)
const UserSchema = new mongoose.Schema(
  {


    UserID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    AstrologerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Astrology",
    },

    Date: {
      type: String,
    },

    Duration: {
      type: String,
    },

    Time: {
      type: String,
    },

    Type: {
      type: String
    },

    Status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({
  phone_number: 1,
});


module.exports = mongoose.model("Consultation", UserSchema);
