const mongoose = require("mongoose");

const watercanSchema = new mongoose.Schema({
    Brand: {
        type: String,
    },
    MRP: {
        type: Number,
        required: [true, 'Price is required'],
        min: [1, 'Price must be at least 1'],
    },
    selling_price:{
        type: Number
    },
    capacityInLiters: {
        type: Number,
        required: [true, 'Capacity (in liters) is required'],
    },
   
})

module.exports = mongoose.model("Watercan", watercanSchema);