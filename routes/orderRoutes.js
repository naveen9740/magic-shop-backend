const express = require("express");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");
const Order = require("../models/Order");
const router = express.Router();

// Create Order
router.post("/create", verifyTokenAndAdmin, async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.json({ success: true, savedOrder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router
  .route("/:id")
  // Update Product
  .put(verifyTokenAndAdmin, async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.json({ success: true, updatedOrder });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  })
  // Delete Order
  .delete(verifyTokenAndAdmin, async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.json({ success: true, message: "Order Deleted" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
// Get User Orders
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.findOne({ userId });
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get All
router.route("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.json({ success: true, orders });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: error.message, ss: req.params.id });
  }
});

module.exports = router;
