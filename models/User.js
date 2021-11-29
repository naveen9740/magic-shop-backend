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
      minlength: [5, "Password should exceed 5 characters"],
      maxlength: [8, "Password should not exceed 8 characters"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
