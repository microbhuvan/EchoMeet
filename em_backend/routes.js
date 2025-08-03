require("dotenv").config();

const express = require("express");
const router = express.Router();
const authController = require("./controllers/auth-controller");

router.post("/api/send-otp", authController.sendOtp);
router.post("/api/verify-otp", authController.verifyOtp);

module.exports = router;
