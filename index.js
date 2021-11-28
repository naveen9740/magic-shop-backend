const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// initialize app
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

// config env
dotenv.config({ path: "./config.env" });

// db connection
mongoose
  .connect(process.env.URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then((data) => console.log("mongoose connected"))
  .catch((err) => console.log(err));

// import routes
const user = require("./routes/user");
app.use("/api/users", user);

app.get("/api", (req, res) => {
  res.json({ msg: "home page" });
});

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
