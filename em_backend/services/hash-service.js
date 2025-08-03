require("dotenv").config();
const crypto = require("crypto");

class HashService {
  async hashOtp(data) {
    return crypto
      .createHmac("sha256", process.env.SECRET_HASH)
      .update(data)
      .digest("hex");
  }
}

module.exports = new HashService();
