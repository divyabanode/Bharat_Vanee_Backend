const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },

    password: {
      type: String
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

    image: {
      type: String
    },
  },
  {
    timestamps: true,
  }
);

AdminSchema.index({
  phone_number: 1,
});

module.exports = mongoose.model("Admin", AdminSchema);
