const Message = require("../model/whatsappModel");
const { getNextStep } = require("../services/botFlow");
const { sendMessageToWhatsApp, recieveWhatsappMessage } = require("../services/whatsappService");

const userSession = {}; // Store user session temporarily

/**
 * ✅ Handle Incoming WhatsApp Webhook Messages
 */
const sentMessages = new Set(); // Store sent message IDs

const handleIncomingMessage = async (req, res) => {
    console.log("📩 FULL INCOMING WEBHOOK DATA:", JSON.stringify(req.body, null, 2));

    const entry = req.body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    const messages = value?.messages || [];

    for (const message of messages) {
        const messageId = message.id;
        const from = message.from;
        const body = message.text?.body?.trim();

        if (sentMessages.has(messageId)) {
            console.log("📤 Outgoing message detected:", body);
            sentMessages.delete(messageId); // Remove after detecting
        } else {
            console.log("📩 Incoming message from", from, ":", body);
            await sendMessageToWhatsApp(from, `You said: "${body}"`);
        }
    }

    res.sendStatus(200);
};


/**
 * ✅ Handle WhatsApp Webhook Bot Flow
 */
const handleWebhook = async (req, res) => {
    try {
        const data = req.body;
        console.log("📩 Incoming Webhook Data:", JSON.stringify(data, null, 2));

        if (!data.entry || !data.entry[0].changes[0].value.messages) {
            return res.status(400).json({ error: "Invalid webhook data" });
        }

        const messageEntry = data.entry[0].changes[0].value.messages[0];
        if (!messageEntry || !messageEntry.text) {
            return res.status(400).json({ error: "Invalid message format" });
        }

        const from = messageEntry.from;
        const body = messageEntry.text.body.trim();

        console.log(`📩 Received: "${body}" from ${from}`);

        await Message.create({ from, body });

        // Reset session on "hi"
        if (body.toLowerCase() === "hi") {
            userSession[from] = "start";
        }

        const currentStep = userSession[from] || "start";
        let nextStepData = getNextStep(currentStep, body, userSession[from]);

        if (!nextStepData || !nextStepData.message) {
            return res.status(400).json({ error: "Invalid response, no next step found" });
        }

        userSession[from] = nextStepData.next || "start";

        await sendMessageToWhatsApp(from, nextStepData.message);

        res.status(200).json({
            from,
            receivedMessage: body,
            botResponse: nextStepData.message,
            nextStep: userSession[from],
        });
    } catch (error) {
        console.error("❌ Internal Server Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

/**
 * ✅ Send Manual WhatsApp Messages
 */
const sendMessage = async (req, res) => {
    try {
        console.log("📩 Received request body:", req.body);

        const { to, body } = req.body;

        if (!to || !body) {
            return res.status(400).json({ error: "Missing recipient number or message body" });
        }

        console.log(`📩 Sending WhatsApp message to ${to}: ${body}`);

        await sendMessageToWhatsApp(to, body);

        res.status(200).json({
            success: true,
            message: "Message sent successfully!",
        });
    } catch (error) {
        console.error("❌ Error sending message:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// ✅ Export All Functions
module.exports = { handleIncomingMessage, handleWebhook, sendMessage };
