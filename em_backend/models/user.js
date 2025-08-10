const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: true,
    },
    activated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = { User };
