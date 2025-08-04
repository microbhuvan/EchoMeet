const otpService = require("../services/otp-service");
const hashService = require("../services/hash-service");
const userService = require("../services/user-service");
const tokenService = require("../services/token-service");

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
      //await otpService.sendBySms(phone, otp);
      return res
        .status(200)
        .json({ hash: fullHash, phone, otp, message: "OTP sent successfully" });
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
      //converts string to number
      return res.status(400).json({ message: "OTP has expired" });
    }

    const data = `${phone}.${otp}.${expires}`;
    const isValid = otpService.verifyHashedOtp(hashedOtp, data);

    if (!isValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    let user;

    try {
      user = await userService.findUser({ phone: phone });
      if (!user) {
        user = await userService.createUser({ phone: phone });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "DB error" });
    }

    const { accessToken, refreshToken } = await tokenService.generateTokens({
      _id: user._id,
      activated: false,
    });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7, //millisecond * 1 minute * 1 hour * 1 day * 7 days
      httpOnly: true,
    });

    res.json({ accessToken });
  }
}

module.exports = new AuthController();
