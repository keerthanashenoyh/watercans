// vendorController.js
const VendorApplication = require('../model/vendorapplicationModel'); // path to your vendor application model
const Vendor = require('../model/vendorModel'); // path to your vendor model


const getVendorById = async (req, res) => {
    try {
        const id = req.params.id;
        const vendor = await Vendor.findById(id);
        if (!vendor) {
            return res.status(404).json({
                success: false, message: "Vendor not found"
            });
        }
        res.status(200).json({
            success: true, message: "Vendor found", data:
                vendor
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error finding vendor",
            error: error.message,
        });
    }
}

const getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find();
        res.status(200).json({
            success: true,
            message: "Vendors found",
            data: vendors,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error finding vendors",
            error: error.message,
        });
    }
}
const getVendorsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const vendors = await Vendor.find({ user_id: userId });

    return res.status(200).json({
      success: true,
      message: "Vendors found",
      data: vendors || [],
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error finding vendors",
      error: error.message,
    });
  }
};

const restrictVendor = async (req, res) => {
    try {
        const id = req.params.id;
        // Update the vendor's restricted flag to true and return the updated document
        const vendor = await Vendor.findByIdAndUpdate(
            id,
            { restricted: true },
            { new: true } // Option to return the updated document
        );
        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: "Vendor not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Vendor has been restricted successfully",
            data: vendor
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error restricting vendor",
            error: error.message,
        });
    }
};


const unrestrictVendor = async (req, res) => {
    try {
        const id = req.params.id;
        // Update the vendor's restricted flag to false and return the updated document
        const vendor = await Vendor.findByIdAndUpdate(
            id,
            { restricted: false },
            { new: true } // Option to return the updated document
        );
        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: "Vendor not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Vendor has been unrestricted successfully",
            data: vendor
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error unrestricting vendor",
            error: error.message,
        });
    }
}


const updateVendorsByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const updateData = req.body;

        const updatedVendor = await Vendor.findOneAndUpdate(
            { user_id: userId },
            updateData,
            { new: true }
        );

        if (!updatedVendor) {
            return res.status(404).json({
                success: false,
                message: "Vendor not found for this user",
            });
        }

        res.status(200).json({
            success: true,
            message: "Vendor updated successfully",
            data: updatedVendor,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating vendor",
            error: error.message,
        });
    }
};


module.exports = {
    getVendorById,
    getAllVendors,
    getVendorsByUserId,
    restrictVendor,
    unrestrictVendor,

    updateVendorsByUserId
};
