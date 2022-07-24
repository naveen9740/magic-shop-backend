const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// initialize app
const app = express();
app.use(cors());
app.use(express.json());

// config env
dotenv.config();

// db connection
mongoose
  .connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
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

app.get("/", (req, res) => {
  res.json({ success: true, message: "Finally server started" });
});

app.listen(process.env.PORT, () => {
  console.log(`server started at ${process.env.PORT || 5000} now`);
});
