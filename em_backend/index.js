require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const connectDB = require("./database/connect");
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());
const router = require("./routes");
app.use("/", router);

app.get("/", (req, res) => {
  res.send("working server");
});

connectDB()
  .then(() => {
    console.log("connect to databse successfully");
    app.listen(PORT, () => {
      console.log("server started");
    });
  })
  .catch((err) => console.log(err));
