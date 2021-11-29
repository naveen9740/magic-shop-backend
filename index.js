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
const auth = require("./routes/auth");
const user = require("./routes/userRoute");
app.use("/api/v1", auth);
app.use("/api/v1/users", user);

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
