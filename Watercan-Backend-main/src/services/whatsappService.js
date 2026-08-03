const axios = require("axios");
require("dotenv").config();

const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID; // Load once at the top
const accessToken = process.env.WHATSAPP_ACCESS_TOKEN; // Load once at the top

console.log("📌 Phone Number ID:", phoneNumberId || "❌ Not Loaded");
console.log("📌 Access Token:", accessToken ? "✅ Loaded" : "❌ Not Loaded");

const sendMessageToWhatsApp = async (to, message) => {
    try {
        if (!phoneNumberId) throw new Error("❌ PHONE_NUMBER_ID is missing in environment variables");
        if (!accessToken) throw new Error("❌ ACCESS_TOKEN is missing in environment variables");

        const response = await axios.post(
            `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,
            {
                messaging_product: "whatsapp",
                to, // Use the function parameter, not a hardcoded number
                type: "text",
                text: { body: message }
            },
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`, // Fixed reference
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("✅ Message sent successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error sending message:", error.response?.data || error.message);
        throw new Error("Failed to send WhatsApp message");
    }
};

const checkWhatsAppToken = async () => {
    try {
        if (!accessToken) throw new Error("❌ ACCESS_TOKEN is missing in environment variables");

        const response = await axios.get(
            `https://graph.facebook.com/v18.0/me?access_token=${accessToken}`
        );

        if (response.data.id) {
            console.log("✅ WhatsApp API Token is valid.");
        } else {
            console.error("❌ Invalid WhatsApp API Token.");
        }
    } catch (error) {
        console.error("❌ Failed to validate WhatsApp API Token:", error.response?.data || error.message);
    }
};

const recieveWhatsappMessage = async (req, res) => {
    try {
        console.log("📩 Incoming Webhook Data:", JSON.stringify(req.body, null, 2));
        res.sendStatus(200);
    } catch (error) {
        console.error("❌ Error handling incoming message:", error);
        res.status(500).json({ error: "Failed to process incoming message" });
    }
};

module.exports = { sendMessageToWhatsApp, checkWhatsAppToken, recieveWhatsappMessage };

