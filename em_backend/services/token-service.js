const jwt = require("jsonwebtoken");
const { RefreshToken } = require("../models/refresh");

const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;

class TokenService {
  async generateTokens(payload) {
    //userid and activated:false = payload
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

  async verifyAccessToken(token) {
    return jwt.verify(token, accessTokenSecret);
  }

  async verifyRefreshToken(refreshToken) {
    await jwt.verify(refreshToken, refreshTokenSecret);
  }

  async findRefreshToken(userId, refreshToken) {
    return await RefreshToken.find({ userId: userId, token: refreshToken });
  }

  async updateRefreshToken(userId, refreshToken) {
    return await RefreshToken.updateOne(
      { userId: userId }, //find this
      { token: refreshToken }, //for that user id replace/update this value
      { new: true } //return new value
    );
  }

  async removeToken(refreshToken) {
    return await RefreshToken.deleteOne({ token: refreshToken });
  }
}

module.exports = new TokenService();
