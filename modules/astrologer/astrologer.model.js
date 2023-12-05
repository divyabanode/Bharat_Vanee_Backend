const mongoose = require("mongoose");


const AstrologerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },

    name: {
      type: String,
    },

    bio: {
      type: String,
    },

    phone_number: {
      type: Number,
      unique: true,

    },
    otp: {
      type: Number
    },

    active: {
      type: Boolean
    },

    specialization: {
      type: String,
    },

    YearsOfExperience: {
      type: Number
    },

    Rating: {
      type: String,
    },

    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

AstrologerSchema.index({
  phone_number: 1,
});


module.exports = mongoose.model("Astrologer", AstrologerSchema);
