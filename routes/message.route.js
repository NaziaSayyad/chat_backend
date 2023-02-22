const express = require("express");
const { sendMessage, allMessages } = require("../controllers/message.controller");
const { protect } = require("../Middleware/auth.middleware");


const router = express.Router();

router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);

module.exports = router;