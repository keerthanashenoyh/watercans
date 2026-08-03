const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: [true, "Name is required"],
  },

  user_id: {
    type: String,
    unique: true,
    default: uuidv4,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  role: {
    type: String,
    enum: ["user", "vendor", "admin"],
    default: "user",
  },

  phoneNumber: String,

  password: {
    type: String,
    required: true,
  },

},
{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);