const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      sparse: true,
    },

    name: {
      type: String,
    },

    phone_number: {
      type: String,
      unique: true,
    },

    age: {
      type: Number,
    },

    gender: {
      type: String,
    },

    city: {
      type: String,
    },

    // image: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Upload",
    // },

    otp: {
      type: Number
    },
    
    otp_verified: {
      type: Boolean,
      default: false,
    },

    location: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({
  phone_number: 1,
});


module.exports = mongoose.model("User", UserSchema);
