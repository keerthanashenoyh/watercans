const { sendMessageToWhatsApp } = require("../services/whatsappService");

const handleIncomingMessage = async (req, res) => {
    try {
        const entry = req.body.entry?.[0];
        const changes = entry?.changes?.[0];
        const value = changes?.value;
        const message = value?.messages?.[0];
        const contact = value?.contacts?.[0];

        if (!message || !contact) {
            console.error("❌ Error: Invalid message format received", req.body);
            return res.status(400).json({ error: "Invalid message format" });
        }

        const from = message.from; // WhatsApp user phone number
        const body = message.text?.body;
        const userName = contact.profile?.name;

        console.log(`✅ Valid Message Received - From: ${userName} (${from}), Body: "${body}"`);

        let responseMessage = "🤖 I didn't understand that. Please try again.";
        if (body.toLowerCase() === "hi") {
            responseMessage = `👋 Hello, ${userName}! Welcome to our service. How can we help you?`;
        }

        await sendMessageToWhatsApp({ body: { to: from, body: responseMessage } }, res);
    } catch (error) {
        console.error("❌ Error handling incoming message:", error);
        res.status(500).json({ error: "Failed to process incoming message" });
    }
};

module.exports = { handleIncomingMessage };
