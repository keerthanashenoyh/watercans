const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");

// router.post("/createOrder", orderController.createOrder);
router.post("/createOrderByVendorUserId", orderController.CreateOrderByVendorUserId);
router.post("/createOrder", orderController.createOrder);
router.get("/getOrder/:id", orderController.getOrderById);
router.get("/getAllOrders", orderController.getAllOrder);
router.get("/getOrdersByVendor/:vendor_id", orderController.getOrdersByVendor);
router.put("/updateOrder/:id", orderController.updateOrder);
router.get("/getOrdersByVendorUserId/:vendor_id", orderController.getOrdersByVendorUserId);
// router.delete("/deleteOrder/:id", orderController.deleteOrder);

module.exports = router;