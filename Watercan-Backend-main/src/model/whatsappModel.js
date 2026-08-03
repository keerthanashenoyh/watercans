const mongoose = require("mongoose");

// Define the schema for storing WhatsApp messages
const messageSchema = new mongoose.Schema({
    from: { type: String, required: true },  // Sender's phone number
    body: { type: String, required: true },  // Message content

    // Store user details directly instead of referencing User model
    name: { type: String, required: false }, 
    phoneNumber: { type: String, required: false }, 
    address: { type: String, required: false },  

    // Reference to Watercan model
    watercanId: { type: mongoose.Schema.Types.ObjectId, ref: "Watercan", required: false },

    numberOfWatercans: { type: Number, default: 1 }, // Default to 1 if not provided
    deliveryTime: { type: String, required: false },

    timestamp: { type: Date, default: Date.now }
});

// Create a Mongoose model based on the schema
const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
