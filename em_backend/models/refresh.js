const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const RefreshToken = mongoose.model(
  "RefreshToken",
  refreshTokenSchema,
  "tokens"
);
module.exports = { RefreshToken };
