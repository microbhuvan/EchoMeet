const jwt = require("jsonwebtoken");
const { RefreshToken } = require("../models/refresh");

const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;

class TokenService {
  async generateTokens(payload) {
    const accessToken = await jwt.sign(payload, accessTokenSecret, {
      expiresIn: "1h",
    });
    const refreshToken = await jwt.sign(payload, refreshTokenSecret, {
      expiresIn: "7d",
    });

    return { accessToken, refreshToken };
  }

  async storeRefreshToken(token, userId) {
    try {
      await RefreshToken.create({
        token,
        userId,
      });
    } catch (err) {
      console.log(err.message);
    }
  }
}

module.exports = new TokenService();
