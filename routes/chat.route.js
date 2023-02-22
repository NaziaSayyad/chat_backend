const express = require('express');
const {acesschat, fetchchat} = require('../controllers/chat.controllers');
const { protect } = require('../Middleware/auth.middleware');
const router = express.Router();

router.route('/').post(protect, acesschat);
router.route('/').get(protect, fetchchat);

module.exports = router; 