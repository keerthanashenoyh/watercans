const vendorApplication = require("../model/vendorapplicationModel");
const Vendor = require("../model/vendorModel");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const axios = require("axios");
require("dotenv").config();


// ================= EMAIL SETUP =================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendApprovedEmail = async (email) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Application Approved",
      text: "Your vendor application has been approved."
    });
  } catch (err) {
    console.error("Email error:", err.message);
  }
};

const sendRejectedEmail = async (email) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Application Rejected",
      text: "Your vendor application has been rejected."
    });
  } catch (err) {
    console.error("Email error:", err.message);
  }
};


// ================= CREATE =================
const createApplication = async (req, res) => {
  try {
    const {
      user_id,
      name,
      email,
      state,
      address,
      phoneNumber,
      pincode,
      city,
      delivery_start_time,
      delivery_end_time,
      deliverable_water_cans
    } = req.body;

    console.log("Incoming Data:", req.body);

    // ✅ ObjectId validation
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ message: "Invalid user_id" });
    }

    // ✅ Required fields validation
    if (
      !name?.trim() ||
      !email?.trim() ||
      !state?.trim() ||
      !address?.trim() ||
      !phoneNumber ||
      !pincode ||
      !city?.trim() ||
      !delivery_start_time ||
      !delivery_end_time ||
      !Array.isArray(deliverable_water_cans) ||
      deliverable_water_cans.length === 0
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Prevent duplicate application
    const existing = await vendorApplication.findOne({ user_id });
    if (existing) {
      return res.status(400).json({ message: "Application already submitted" });
    }

    // ✅ Convert dates
    const startTime = new Date(delivery_start_time);
    const endTime = new Date(delivery_end_time);

    if (isNaN(startTime) || isNaN(endTime)) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const application = await vendorApplication.create({
      user_id,
      name,
      email,
      state,
      address,
      phoneNumber,
      pincode,
      city,
      delivery_start_time: startTime,
      delivery_end_time: endTime,
      deliverable_water_cans,
      status: "pending"
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: application
    });

  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ================= GET ALL =================
const getAllApplication = async (req, res) => {
  try {
    const data = await vendorApplication.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= GET BY ID =================
 const getApllicationById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const data = await vendorApplication.findById(id);

    if (!data) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= GET BY USER =================
const getApplicationByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const data = await vendorApplication.find({
      user_id: userId,
    });

    if (!data || data.length === 0) {
      return res.status(200).json([]); // IMPORTANT FIX (don’t use 404)
    }

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};


// ================= DELETE =================
const deleteApplication = async (req, res) => {
  try {
    const data = await vendorApplication.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json({ success: true, message: "Deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= APPROVE =================
const approveApplication = async (req, res) => {
  try {
    const { application_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(application_id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const application = await vendorApplication.findById(application_id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.status === "approved") {
      return res.status(400).json({ message: "Already approved" });
    }

    const vendor = await Vendor.create({
      name: application.name,
      email: application.email,
      user_id: application.user_id,
      state: application.state,
      address: application.address,
      phoneNumber: application.phoneNumber,
      pincode: application.pincode,
      city: application.city,
      delivery_start_time: application.delivery_start_time,
      delivery_end_time: application.delivery_end_time,
      deliverable_water_cans: application.deliverable_water_cans,
    });

    application.status = "approved";
    await application.save();

    // ✅ non-blocking email
    sendApprovedEmail(application.email).catch(() => {});

    res.json({
      success: true,
      message: "Application approved",
      data: vendor
    });

  } catch (err) {
    console.error("APPROVE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


// ================= REJECT =================
const rejectApplication = async (req, res) => {
  try {
    const app = await vendorApplication.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );

    if (!app) {
      return res.status(404).json({ message: "Application not found" });
    }

    sendRejectedEmail(app.email);

    res.json({
      success: true,
      message: "Application rejected",
      data: app
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= PINCODE =================
const pincodeDetails = async (req, res) => {
  try {
    const { search } = req.body;

    if (!search) {
      return res.status(400).json({ message: "Pincode required" });
    }

    const response = await axios.get(`https://api.postalpincode.in/pincode/${search}`);

    if (!response.data || response.data[0].Status !== "Success") {
      return res.status(404).json({ message: "Invalid pincode" });
    }

    const postOffice = response.data[0].PostOffice[0];

    res.json({
      city: postOffice.District,
      state: postOffice.State,
      pincode: search
    });

  } catch (err) {
    res.status(500).json({ message: "Error fetching pincode" });
  }
};


// ================= EXPORT =================
module.exports = {
  createApplication,
  getAllApplication,
  getApllicationById,
  getApplicationByUserId,
  deleteApplication,
  approveApplication,
  rejectApplication,
  pincodeDetails
};