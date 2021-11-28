const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "Please Enter the UserId"],
    },
    products: [
      {
        productId: {
          type: Strimg,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
