const otpService = require("../services/otp-service");
const hashService = require("../services/hash-service");
const userService = require("../services/user-service");
const tokenService = require("../services/token-service");
const UserDto = require("../dtos/user-dto");
const { User } = require("../models/user");

class AuthController {
  async sendOtp(req, res) {
    //get phone from input
    const { phone } = req.body;

    //check if phone is entered or not
    if (!phone) {
      res.status(400).json({ message: "Phone field is required" });
    }

    //generate otp by calling the method
    const otp = await otpService.generateOtp();

    //time to live 1000 millisecond into 60 seconds into 5 minutes
    const ttl = 1000 * 60 * 5; //5mins
    const expires = Date.now() + ttl;
    const data = `${phone}.${otp}.${expires}`;

    //hash the data by calling the function
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
  /************************************************************************* */

  async verifyOtp(req, res) {
    //take otp as input from frontend
    const { phone, otp, hash } = req.body;

    if (!phone || !otp || !hash) {
      return res.status(400).json({ message: "all fields are required" });
    }

    //hash.expires
    const [hashedOtp, expires] = hash.split(".");
    if (Date.now() > +expires) {
      //+ converts string to number
      return res.status(400).json({ message: "OTP has expired" });
    }

    //create out own has to compare with user hash
    const data = `${phone}.${otp}.${expires}`;
    const isValid = otpService.verifyHashedOtp(hashedOtp, data);

    if (!isValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    let user;

    //finding or creating user
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

    //storing rt in db wrt to the user
    await tokenService.storeRefreshToken(refreshToken, user._id);

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7, //millisecond * 1 minute * 1 hour * 1 day * 7 days
      httpOnly: true, //only sent as http req from server cannot be accessed by js in browser to protect from xxs cross site scripting(injecting malicious js into sites)
      //cannot use cookie through document.cookie
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 1,
      httpOnly: true,
    });

    //data transfer object
    const userDto = new UserDto(user);

    return res.json({ auth: true, user: userDto });
  }
  /************************************************* */

  async refresh(req, res) {
    //refreshing tokens
    const { refreshToken: refreshTokenFromCookie } = req.cookies;

    let userData;
    //jwt.verify token
    try {
      userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie);
      //user data means the token contains user id and activated:false
    } catch (err) {
      console.log(err);
    }

    //checking if token is in db
    try {
      const token = await tokenService.findRefreshToken(
        userData._id,
        refreshTokenFromCookie
      );

      if (!token) {
        return res.status(401).json({ message: "invalid token" });
      }
    } catch (err) {
      return res.status(500).json({ message: "internal error" });
    }

    //cheking if the user connected to token exists
    const user = await User.find({ _id: userData._id });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    //creating new tokens
    const { refreshToken, accessToken } = tokenService.generateTokens({
      _id: userData._id,
    });

    //update refresh token
    try {
      await tokenService.updateRefreshToken(userData._id, refreshToken);
    } catch (err) {
      return res.status(500).json({ message: "internal error" });
    }

    //add new tokens in cookie

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 1,
      httpOnly: true,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });

    const userDto = new UserDto(user);
    return res.status(200).json({ user: userDto, auth: true });
  }
}

module.exports = new AuthController();
