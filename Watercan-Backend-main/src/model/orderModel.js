const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    watercan_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Watercan"
    },

    vendor_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vendor"
    },
   
    totalAmount: {
        type: Number,
        required: [true, "Total amount is required"],
    },
   
    orderStatus: {
        type: String,
        enum: ["Order placed", "Shipped", "Delivered", "Cancelled"],
        default: "Order placed",
    },

    timeSlot: {
        type: String,
        required: [true, "Time slot is required"],
        enum: ["10:00 AM - 12:00 PM", "12:00 PM - 03:00 PM", "03:00 PM - 06:00 PM", "06:00 PM - 09:00 PM"],
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    updatedAt: {
        type: Date,
        default: Date.now,
    },

    
});

module.exports = mongoose.model("Order", orderSchema);