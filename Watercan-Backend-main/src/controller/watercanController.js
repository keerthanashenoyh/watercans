const Watercan = require("../model/watercanModel");

const createWatercan = async (req, res) => {

    try {
        const { Brand, MRP, capacityInLiters, selling_price } = req.body;
        const watercan = await Watercan.create({ Brand, MRP, capacityInLiters, selling_price });
        res.status(201).json({ message: "watercan created successfully", data: watercan });
    } catch (error) {
        res.status(500).json({ message: "Error creating watercan", error: error.message });
    }
}

const getAllWatercan = async (req, res) => {
    try {
        const watercan = await Watercan.find();
        res.status(200).json({ success: true, data: watercan });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getWatercanById = async (req, res) => {
    try {
        const id = req.params.id;
        const watercan = await Watercan.findById(id);
        if (!watercan) {
            return res.status(404).json({ success: false, message: "Watercan not found" });
        }
        res.status(200).json({ success: true, data: watercan });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateWaterCanById = async (req, res) => {
    try {
        const id = req.params.id;

        const allowedFields = ["MRP", "selling_price"];
        const updateFields = Object.keys(req.body);
    
        // Check if all fields in the request are allowed
        const isValidUpdate = updateFields.every((field) => allowedFields.includes(field));
    
        if (!isValidUpdate) {
          return res.status(400).json({
            success: false,
            message: "Only MRP and selling_price can be updated.",
          });
        }

        
        const {  MRP, selling_price } = req.body;
        if (!MRP || !selling_price) {
            return res.status(400).json({ success: false, message: "MRP and selling_price are required" });
        }

        const watercan = await Watercan.findByIdAndUpdate(id, {  MRP,  selling_price }, { new: true });

        if (!watercan) {
            return res.status(404).json({ success: false, message: "Watercan not found" });
        }
        res.status(200).json({ success: true, message: "Watercan updated successfully", data: watercan });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleetWatercanById = async (req, res) => {
    try {
        const id = req.params.id;
        const watercan = await Watercan.findByIdAndDelete(id);
        if (!watercan) {
            
            return res.status(404).json({ success: false, message: "Watercan not found" });
            }
            res.status(200).json({ success: true, message: "Watercan deleted successfully"
                });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    };

module.exports = { createWatercan,
     getAllWatercan,
     getWatercanById,
     deleetWatercanById,
     updateWaterCanById,
     };