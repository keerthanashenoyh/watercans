const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/create', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/forgot-password', userController.forgotPassword);

module.exports = router;