const express = require("express");
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const router = express.Router();

require("dotenv").config();

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
    console.log(process.env.PASS_SEC);
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    !user &&
      res.status(401).json({ success: false, message: "User Not Found" });
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    console.log(hashedPassword);
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    console.log("ooo", OriginalPassword);

    OriginalPassword !== password &&
      res.status(401).json({ success: false, message: "Incorrect password" });

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "1d" }
    );

    const {
      password: { userpassword },
      ...others
    } = user._doc;
    res.json({ success: true, message: "Logged In Success", others, token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
