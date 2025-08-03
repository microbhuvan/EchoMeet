const otpService = require("../services/otp-service");
const hashService = require("../services/hash-service");

class AuthController {
  async sendOtp(req, res) {
    const { phone } = req.body;

    if (!phone) {
      res.status(400).json({ message: "Phone field is required" });
    }

    const otp = await otpService.generateOtp();

    const ttl = 1000 * 60 * 5; //5mins
    const expires = Date.now() + ttl;
    const data = `${phone}.${otp}.${expires}`;

    const hash = await hashService.hashOtp(data);
    const fullHash = `${hash}.${expires}`;

    try {
      await otpService.sendBySms(phone, otp);
      return res
        .status(200)
        .json({ hash: fullHash, phone, message: "OTP sent successfully" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "failed to send OTP", error: err.message });
    }
  }

  async verifyOtp(req, res) {
    const { phone, otp, hash } = req.body;

    if (!phone || !otp || !hash) {
      return res.status(400).json({ message: "all fields are required" });
    }

    const [hashedOtp, expires] = hash.split(".");
    if (Date.now() > +expires) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    const data = `${phone}.${otp}.${expires}`;
    const isValid = otpService.verifyHashedOtp(hashedOtp, data);

    if (!isValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    let user;
    let accessToken;
    let refreshToken;
  }
}

module.exports = new AuthController();
