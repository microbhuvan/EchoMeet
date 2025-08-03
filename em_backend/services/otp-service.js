require("dotenv").config();
const crypto = require("crypto");
const twilio = require("twilio");
const hashService = require("./hash-service");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

class OtpService {
  async generateOtp() {
    const otp = crypto.randomInt(100000, 999999);
    return otp;
  }

  async sendBySms(phone, otp) {
    return await client.messages.create({
      to: phone,
      from: process.env.TWILIO_PHONE_NUMBER,
      body: `Your EchoMeet OTP is ${otp} and it expires in 4 minutes`,
    });
  }

  async verifyHashedOtp(hashedOtp, data) {
    let computedHash = await hashService.hashOtp(data);
    return computedHash === hashedOtp;
  }

  sendByEmail() {}
}

module.exports = new OtpService();
