const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, 
    },
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true, 
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"],
    },
    status: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending",
    },
    paymentMethod: {
        type: String,
        enum: ["razorpay", "cod", "upi", "card"],
        required: [true, "Payment method is required"],
    },
    transactionId: {
        type: String,
        // required: [true, "Transaction ID is required"],
    },
    razorpay_payment_id: {
        type: String, 
    },
    razorpay_order_id: {
        type: String,
    },
    razorpay_signature: {
        type: String, // Store the signature for verification
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Payment", paymentSchema);
