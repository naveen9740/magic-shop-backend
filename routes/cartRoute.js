const express = require("express");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");
const Cart = require("../models/Cart");
const router = express.Router();

// Create Cart
router.post("/create", verifyTokenAndAdmin, async (req, res) => {
  try {
    const newCart = new Cart(req.body);
    const savedCart = await newCart.save();
    res.json({ success: true, savedCart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router
  .route("/:id")
  // Update Product
  .put(verifyTokenAndAuthorization, async (req, res) => {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.json({ success: true, updatedCart });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  })
  // Delete Cart
  .delete(verifyTokenAndAuthorization, async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.json({ success: true, message: "Cart Deleted" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
// Get User Cart
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId });
    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get All
router.route("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json({ success: true, carts });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: error.message, ss: req.params.id });
  }
});

module.exports = router;
