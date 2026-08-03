const express = require("express");
const router = express.Router();
const paymentController = require("../controller/paymentController");

router.post("/createpayment", paymentController.createPaymentOrder); 
// router.post("/verify", paymentController.verifyPayment);

module.exports = router;