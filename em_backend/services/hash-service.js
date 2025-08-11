require("dotenv").config();
const crypto = require("crypto");

class HashService {
  async hashOtp(data) {
    return crypto
      .createHmac("sha256", process.env.SECRET_HASH) //creates hash object
      .update(data) //updates the data to hash object
      .digest("hex"); //mixes everything and returns in hexadecimal form
  }
}

module.exports = new HashService();

//hash based message authentication code
