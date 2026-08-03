const mongoose = require("mongoose");
const Order = require("../model/orderModel");
const Vendor = require("../model/vendorModel");

const createOrder = async (req, res) => {
    try {
        const { user_id, watercan_id, vendor_id, totalAmount, orderStatus, timeSlot } = req.body;

        if (!user_id || !watercan_id || !vendor_id || !totalAmount || !timeSlot) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Verify if the vendor exists and has an approved status
        const vendor = await Vendor.findById(vendor_id);
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        const newOrder = new Order({ user_id, watercan_id, vendor_id, totalAmount, orderStatus, timeSlot });
        await newOrder.save();

        res.status(201).json({ message: "Order created successfully", data: newOrder });

    } catch (error) {
        res.status(500).json({ message: "Error creating order", error: error.message });
    }
};

const CreateOrderByVendorUserId = async (req, res) => {
    try {
        const { user_id, watercan_id, vendor_id, totalAmount, orderStatus, timeSlot } = req.body;

        if (!user_id || !watercan_id || !vendor_id || !totalAmount || !timeSlot) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find the Vendorapplication using the vendor's user_id
        const vendor = await Vendor.findOne({ user_id: vendor_id });

        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found with this user_id" });
        }

        // Check if the vendor can deliver the requested watercan
        const canDeliver = vendor.deliverable_water_cans.includes(watercan_id);

        if (!canDeliver) {
            return res.status(403).json({ message: "Vendor does not deliver this water can" });
        }

        const newOrder = new Order({
            user_id,
            watercan_id,
            vendor_id, // This is the vendor's user_id
            totalAmount,
            orderStatus,
            timeSlot
        });

        await newOrder.save();

        res.status(201).json({ message: "Order created successfully", data: newOrder });

    } catch (error) {
        res.status(500).json({ message: "Error creating order", error: error.message });
    }
};

const getOrdersByVendorUserId = async (req, res) => {
    try {
        const { vendor_id } = req.params;

        if (!vendor_id) {
            return res.status(400).json({ message: "Vendor user_id is required" });
        }

        // Since vendor_id in Order is stored as the vendor's user_id
        const orders = await Order.find({ vendor_id })
            .populate("user_id", "name email phoneNumber")
            .populate("watercan_id", "name price Brand capacityInLiters")
            .sort({ createdAt: -1 });

        res.status(200).json({ message: "Orders fetched successfully", data: orders });
    } catch (error) {
        res.status(500).json({ message: "Error fetching vendor orders", error: error.message });
    }
};

  


const getOrderById = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({
                success: false, message: "Order not found"
            });
        }
        res.status(200).json({
            success: true, message: "Order found",
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error finding order",
            error: error.message,
        });
    }
}

const getAllOrder = async (req, res) => {
    try {
        const orders = await Order.find()

            .populate({ path: "user_id", select: "name phoneNumber" }) 
            .populate({ path: "watercan_id", select: "capacityInLiters" }) 
            .populate({ path: "vendor_id", select: "name", model: "vendor" }); // Fetch vendor name

        if (orders.length === 0) {
            return res.status(404).json({ success: false, message: "No orders found" });
        }

        res.status(200).json({ success: true, message: "Orders retrieved successfully", data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching orders", error: error.message });
    }
};

const getOrdersByVendor = async (req, res) => {
    try {
        const { vendor_id } = req.params;

        if (!vendor_id || !mongoose.Types.ObjectId.isValid(vendor_id)) {
            return res.status(400).json({ success: false, message: "Invalid Vendor ID" });
        }

        console.log("vendor_id:", vendor_id);

        const orders = await Order.find({ vendor_id })
            .populate("user_id watercan_id")
            .populate({
                path: "vendor_id",
                select: "name",
                model: Vendor,
            });

        if (orders.length === 0) {
            return res.status(404).json({ success: false, message: "No orders found for this vendor" });
        }

        res.status(200).json({ success: true, message: "Orders retrieved successfully", data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching orders", error: error.message });
    }
};



const updateOrder = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
        if (!order) {
            return res.status(404).json({
                success: false, message: "Order not found"
            });
        }
        res.status(200).json({
            success: true, message: "Order updated",
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating order",
            error: error.message,
        });
    }
}
module.exports = { createOrder, getOrderById, getAllOrder, getOrdersByVendor, updateOrder, CreateOrderByVendorUserId, getOrdersByVendorUserId };
