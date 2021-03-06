const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Enter the Title"],
      unique: true,
    },
    desc: {
      type: String,
      required: [true, "Please Enter Description"],
    },
    img: {
      type: String,
      required: [true, "Please Add Product img"],
    },
    categories: {
      type: Array,
      required: [true, "Please Enter Product categories"],
    },
    size: {
      type: Array,
      required: [true, "Please Enter Product Size"],
    },
    color: {
      type: Array,
      required: [true, "Please Enter Product Color"],
    },
    price: {
      type: Number,
      required: [true, "Please Enter Product Price"],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
