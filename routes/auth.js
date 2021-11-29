const express = require("express");
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await User.create({
      username,
      email,
      password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
    });

    await newUser.save();
    res.status(201).json({
      success: true,
      message: `${username} account created`,
      newUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    !user &&
      res.status(401).json({ success: false, message: "User Not Found" });
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    OriginalPassword !== password &&
      res.status(401).json({ success: false, message: "Incorrect password" });

    const {
      password: { userpassword },
      ...others
    } = user._doc;
    res.json({ success: true, message: "Logged In Success", others });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
