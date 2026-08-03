const express = require("express");
const router = express.Router();

const VendorApplicationController = require("../controller/vendorapplicationController");

// ================= CREATE =================
router.post("/", VendorApplicationController.createApplication);

// ================= READ =================
router.get("/getAllApplications", VendorApplicationController.getAllApplication);
router.get("/:id", VendorApplicationController.getApllicationById);
router.get("/user/:userId", VendorApplicationController.getApplicationByUserId);

// ================= UPDATE =================
router.put("/approve/:application_id", VendorApplicationController.approveApplication);
router.put("/reject/:id", VendorApplicationController.rejectApplication);

// ================= DELETE =================
router.delete("/:id", VendorApplicationController.deleteApplication);

// ================= PINCODE =================
router.post("/pincode", VendorApplicationController.pincodeDetails);

module.exports = router;