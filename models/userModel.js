const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true }, // User's email address
    password: { type: String, required: true }, // Hashed password
    name: { type: String, required: true }, // Full name of user
    mailVerified: { type: Boolean, default: false }, // Email verification status
  },
  { timestamps: true }
);
const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
