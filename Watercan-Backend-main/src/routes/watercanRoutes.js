const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const watercanController = require('../controller/watercanController');
router.post('/create', watercanController.createWatercan);
router.get('/getAllWatercans', watercanController.getAllWatercan);
router.get('/getWatercanById/:id', watercanController.getWatercanById);
router.put('/updateWatercanById/:id', watercanController.updateWaterCanById);
router.delete('/deleteWatercanById/:id', watercanController.deleetWatercanById);

module.exports = router;