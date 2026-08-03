const mongoose = require("mongoose");

const vendorapplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true },

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },

  pincode: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },

  delivery_start_time: Date,
  delivery_end_time: Date,

  deliverable_water_cans: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Watercan",
    }
  ],

}, { timestamps: true });

const VendorApplication = mongoose.model("VendorApplication", vendorapplicationSchema);

module.exports = VendorApplication;


