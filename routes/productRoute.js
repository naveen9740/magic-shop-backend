const express = require("express");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");
const Product = require("../models/Product");
const router = express.Router();

// Create product
router.post("/create", verifyTokenAndAdmin, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.json({ success: true, savedProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router
  .route("/:id")
  // Update Product
  .put(verifyTokenAndAdmin, async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.json({ success: true, updatedProduct });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  })
  // Delete Product
  .delete(verifyTokenAndAdmin, async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ success: true, message: "Product Deleted" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  })
  // Get Single Product
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findOne({ id });
      res.json({ success: true, product });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, error: error.message, ss: req.params.id });
    }
  });

// Get All Products
router.get("/", async (req, res) => {
  try {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
