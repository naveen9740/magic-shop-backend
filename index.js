const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// config env
dotenv.config({ path: "./config.env" });

// db connection
mongoose
  .connect(process.env.URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then((data) => console.log("mongoose connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.json({ msg: "home page" });
});

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
