const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("working server");
});

app.listen(PORT, () => {
  console.log("server started");
});
