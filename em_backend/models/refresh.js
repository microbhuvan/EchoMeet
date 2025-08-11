const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema(
  {
    token: {
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

//models is like a node/mongoose thing used to acess methods
const RefreshToken = mongoose.model(
  "RefreshToken", //modelname
  refreshTokenSchema, //schema name
  "tokens" //collection name - defualt will be refreshtokens
);
module.exports = { RefreshToken };
