const { extractUserDetails } = require("../services/extractDetails");

const botFlow = {
    start: {
        message: "👋 Welcome to Super Water World! Please share your Name, Mobile Number, and Address to continue.",
        next: "collect_details",
    },
    collect_details: {
        message: "📩 Please enter your details in this format: Name, Mobile Number, Address",
        next: "confirm_details",
    },
    confirm_details: {
        message: (userData) => `✅ We received your details:
👤 Name: ${userData.name}
📞 Mobile: ${userData.mobile}
📍 Address: ${userData.address}

Would you like to proceed?
1️⃣ Yes
2️⃣ No, update details`,
        next: {
            "1": "select_quantity",
            "2": "collect_details",
        },
    },
    select_quantity: {
        message: "💧 How many water cans do you want to order? (e.g., 3 Cans)",
        next: "select_schedule",
    },
    select_schedule: {
        message: `⏰ Please select a delivery time slot:
1️⃣ 9:00 AM - 10:00 AM
2️⃣ 10:00 AM - 11:00 AM
3️⃣ 11:00 AM - 12:00 PM
4️⃣ 12:00 PM - 1:00 PM
5️⃣ 1:00 PM - 2:00 PM
6️⃣ 2:00 PM - 3:00 PM
7️⃣ 3:00 PM - 4:00 PM
8️⃣ 4:00 PM - 5:00 PM`,
        next: "exit",
    },
    exit: {
        message: "✅ Your order has been placed! Thank you for using Super Water World. Have a great day! 🚚💧",
    },
};

const getNextStep = (currentStep, userInput, userData = {}) => {
    if (!userInput || typeof userInput !== "string") {
        return botFlow.start;
    }

    if (userInput.toLowerCase() === "hi") {
        return botFlow.start;
    }

    if (currentStep === "collect_details") {
        const userDetails = extractUserDetails(userInput);

        if (!userDetails.name || !userDetails.mobile || !userDetails.address) {
            return {
                message: "❌ Invalid format. Please enter: Name, Mobile Number, Address",
                next: "collect_details",
            };
        }

        return {
            message: botFlow.confirm_details.message(userDetails),
            next: botFlow.confirm_details.next,
        };
    }

    if (!botFlow[currentStep]) return botFlow.start;

    const stepData = botFlow[currentStep];
    const nextStep = stepData.next;

    if (typeof nextStep === "function") {
        return botFlow[nextStep(userData)];
    }

    if (typeof nextStep === "string") {
        return botFlow[nextStep];
    }

    if (typeof nextStep === "object" && nextStep[userInput]) {
        return botFlow[nextStep[userInput]];
    }

    return botFlow[currentStep]; // Stay in the same step if input is unrecognized
};

module.exports = { getNextStep };
