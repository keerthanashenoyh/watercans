const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../model/paymentModel");
const Order = require("../model/orderModel");

// ✅ Initialize Razorpay (Only if API Keys are available)
// const razorpayInstance = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
//     ? new Razorpay({
//         key_id: process.env.RAZORPAY_KEY_ID,
//         key_secret: process.env.RAZORPAY_KEY_SECRET
//     })
//     : null;

// ✅ Create a Razorpay Order (Real or Mock)
const createPaymentOrder = async (req, res) => {
    try {
        const { order_id, user_id, amount, paymentMethod } = req.body;

        if (!order_id || !user_id || !amount || !paymentMethod) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        let razorpayOrder;
        
        // 🔹 Check if Razorpay is properly initialized
        if (typeof razorpayInstance !== "undefined") {
            razorpayOrder = await razorpayInstance.orders.create({
                amount: amount * 100, // Convert to paise
                currency: "INR",
                receipt: `order_${Date.now()}`,
                payment_capture: 1
            });
        } else {
            console.warn("⚠️ Warning: Razorpay instance not initialized. Using mock order.");
            
            // 🔹 Mock Razorpay Order (For Testing)
            razorpayOrder = {
                id: `mock_order_${Date.now()}`,
                amount: amount * 100,
                currency: "INR",
                status: "created",
            };
        }

        // 🔹 Save Payment Details in DB
        const payment = new Payment({
            user_id,
            order_id,
            amount,
            status: "pending",
            paymentMethod,
            transactionId: razorpayOrder.id,
        });

        await payment.save();

        // 🔹 Update Order Status in DB
        await Order.findByIdAndUpdate(order_id, { orderStatus: "confirmed" });

        res.status(201).json({
            success: true,
            message: "Payment order created",
            order: razorpayOrder,
            payment,
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating payment order", error: error.message });
    }
};


// ✅ Verify Razorpay Payment Signature (Real Payments Only)
// const verifyPayment = async (req, res) => {
//     try {
//         const { order_id, payment_id, signature } = req.body;

//         if (!order_id || !payment_id || !signature) {
//             return res.status(400).json({ success: false, message: "All fields are required" });
//         }

//         if (!razorpayInstance) {
//             return res.status(400).json({ success: false, message: "Real payments are disabled in mock mode." });
//         }

//         const generatedSignature = crypto
//             .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//             .update(order_id + "|" + payment_id)
//             .digest("hex");

//         if (generatedSignature !== signature) {
//             return res.status(400).json({ success: false, message: "Payment verification failed" });
//         }

//         // 🔹 Update Payment Status in DB
//         await Payment.findOneAndUpdate(
//             { transactionId: order_id },
//             { status: "success" }
//         );

//         // 🔹 Update Order Status in DB
//         await Order.findByIdAndUpdate(order_id, { orderStatus: "confirmed" });

//         res.status(200).json({ success: true, message: "Payment verified successfully" });

//     } catch (error) {
//         res.status(500).json({ success: false, message: "Error verifying payment", error: error.message });
//     }
// };

module.exports = { createPaymentOrder };
