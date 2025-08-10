const tokenService = require("../services/token-service");

module.exports = async function (req, res, next) {
  try {
    const { accessToken, refreshToken } = req.cookies;
    console.log(accessToken);
    if (!accessToken) {
      throw new Error();
    }
    const userData = await tokenService.verifyAccessToken(accessToken);
    console.log(userData);

    if (!userData) {
      throw new Error();
    }

    req.user = userData;
    next();
  } catch (err) {
    res.status(401).json({ message: "invalid token" });
  }
};
