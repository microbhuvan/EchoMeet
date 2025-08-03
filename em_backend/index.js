require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
const router = require("./routes");
app.use("/", router);

app.get("/", (req, res) => {
  res.send("working server");
});

app.listen(PORT, () => {
  console.log("server started");
});
