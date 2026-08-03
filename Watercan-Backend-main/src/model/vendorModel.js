const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  address: {
    type: String,
    required: [true, "Address is required"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
  },
  pincode: {
    type: String,
    required: [true, "Pincode is required"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  state: {
    type: String,
    required: [true, "State is required"],
  },

  delivery_start_time: {
    type: Date,
  },
  delivery_end_time: {
    type: Date,
  },


  deliverable_water_cans: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Watercan",
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
  restricted: {
    type: Boolean,
    default: false,
  },

});

module.exports = mongoose.model("vendor", vendorSchema);
