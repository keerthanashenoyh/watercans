require("dotenv").config();
const express = require("express");
const connectDB = require("./config/dbconfig");
const cors = require("cors");
// const ngrok = require("ngrok"); // Import ngrok
const axios = require("axios"); // Add this at the top

// const { checkWhatsAppToken } = require("./src/services/whatsappService");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

const userRoutes = require("./src/routes/userRoutes");
const watercanRoutes = require("./src/routes/watercanRoutes");
const vendorapplicationRoutes = require("./src/routes/vendorapplicationRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const paymentRoutes = require("./src/routes/paymentRoutes");
// const whatsappRoutes = require("./src/routes/whatsappRoutes");
const travelRoutes = require("./src/routes/travelRoutes");
const vendorRoutes = require("./src/routes/vendorRoutes");

// app.use("/api/whatsapp", whatsappRoutes);
app.use("/user", userRoutes);
app.use("/watercan", watercanRoutes);
app.use("/vendorapplication", vendorapplicationRoutes);
app.use("/order", orderRoutes);
app.use("/payment", paymentRoutes);
app.use("/visitor", travelRoutes);
app.use("/vendor", vendorRoutes);

// app.get("/", (req, res) => {
//   res.send("🚀 WhatsApp Bot API is Running...");
//   console.log("🚀 WhatsApp Bot API is Running...");
// });

// Validate WhatsApp API Token
// checkWhatsAppToken();

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);

  // try {
  //   const url = await ngrok.connect(PORT);
  //   console.log(`🌍 ngrok tunnel opened at: ${url}`);
  // } catch (err) {
  //   console.error("❌ Error starting ngrok:", err);
  // }
});
