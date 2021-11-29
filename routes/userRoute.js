const express = require("express");
const {
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const User = require("../models/User");
const router = express.Router();

router
  .route("/:id")
  // get single User
  .get(verifyTokenAndAdmin, async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.json({ success: true, others });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  })
  // update User
  .put(verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString();
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.json({ success: true, updatedUser });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  })
  // Delete User
  .delete(verifyTokenAndAuthorization, async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ success: true, message: "User has been Deleted" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

// Get All Users
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const { newUsers } = req.query;

    const users = newUsers
      ? await User.find().sort({ _id: -1 }).limit(1)
      : await User.find();
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
