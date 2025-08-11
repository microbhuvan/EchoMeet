const tokenService = require("../services/token-service");

module.exports = async function (req, res, next) {
  try {
    const { accessToken, refreshToken } = req.cookies;
    console.log(accessToken);
    //if access token doesnt exist
    if (!accessToken) {
      throw new Error();
    }

    //if access token exist then jwt.verify
    const userData = await tokenService.verifyAccessToken(accessToken);
    console.log(userData);

    //if userData / userData.id is not available
    if (!userData) {
      throw new Error();
    }

    //add the userData to the req.user
    req.user = userData;
    next();
  } catch (err) {
    res.status(401).json({ message: "invalid token" });
  }
};
