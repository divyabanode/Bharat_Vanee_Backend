const mongoose = require("mongoose")
// ;- PaymentID (Primary Key)
// - UserID (Foreign Key from Users Table)
// - ConsultationID (Foreign Key from Consultations Table)
// - Amount
// - Date
// - PaymentMethod
// - Status (Paid, Pending, Failed)
const PaymentSchema = new mongoose.Schema(
  {
   
    UserID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    ConsultationID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Consultation",
    },

    Amount: {
      type: String,
    },

    PaymentMethod: {
      type: String,
      unique: true,
    },

    Date: {
      type: Date,
    },

    Status: {
      type: String,
    },

  },
  {
    timestamps: true,
  }
);

PaymentSchema.index({
  phone_number: 1,
});


module.exports = mongoose.model("Payment", PaymentSchema);
