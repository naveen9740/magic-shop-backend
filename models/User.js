const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Enter your Username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please Enter your Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Enter your Password"],
      min: [5, "Password should exceed 5 characters"],
      max: [8, "Password should not exceed 8 characters"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("User", UserSchema);
