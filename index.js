const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// initialize app
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

// config env
// dotenv.config({ path: "./config.env" });

// db connection
mongoose
  .connect(process.env.URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then((data) => console.log("mongoose connected"))
  .catch((err) => console.log(err));

// import routes
const auth = require("./routes/auth");
const user = require("./routes/userRoute");
const product = require("./routes/productRoute");
const cart = require("./routes/cartRoute");
const order = require("./routes/orderRoutes");
const stripe = require("./routes/stripe");

app.use("/api/v1", auth);
app.use("/api/v1/users", user);
app.use("/api/v1/products", product);
app.use("/api/v1/cart", cart);
app.use("/api/v1/order", order);
app.use("/api/v1/checkout", stripe);

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
