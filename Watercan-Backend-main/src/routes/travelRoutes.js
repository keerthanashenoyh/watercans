const express = require('express');
const TravelPlan  = require('../controller/travelController');

const router = express.Router();

router.get('/travel', TravelPlan.getTravelPlan);

module.exports = router;
