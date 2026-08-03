// const express = require("express");
// const router = express.Router();
// require("dotenv").config();

// const { sendMessage, handleWebhook } = require("../controller/whatsappController");

// const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

// // ✅ Webhook Verification
// router.get("/webhook", (req, res) => {
//     const mode = req.query["hub.mode"];
//     const token = req.query["hub.verify_token"];
//     const challenge = req.query["hub.challenge"];

//     const mytoken = "topic"; // Replace with actual token if needed

//     if (mode && token) {
//         if (mode === "subscribe" && token === mytoken) {
//             console.log("✅ Webhook verified successfully!");
//             return res.status(200).send(challenge);
//         } else {
//             console.error("❌ Verification failed. Invalid token.");
//             return res.sendStatus(403);
//         }
//     }
// });

// // ✅ Webhook to Handle Incoming WhatsApp Messages
// router.post("/webhook", handleWebhook);

// // ✅ Send a WhatsApp Message via API
// router.post("/send", sendMessage);

// module.exports = router;


const express = require("express");
const { handleWebhook, sendMessage, handleIncomingMessage } = require("../controller/whatsappController");

const router = express.Router();

// const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

// ✅ Webhook Verification
router.get("/webhook", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    const mytoken = "topic"; // Replace with actual token if needed

    if (mode && token) {
        if (mode === "subscribe" && token === mytoken) {
            console.log("✅ Webhook verified successfully!");
            return res.status(200).send(challenge);
        } else {
            console.error("❌ Verification failed. Invalid token.");
            return res.sendStatus(403);
        }
    }
});
router.post("/webhook", handleIncomingMessage);
router.post("/bot-webhook", handleWebhook);
router.post("/send-message", sendMessage);

module.exports = router;

