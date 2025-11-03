const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyMailTemplate } = require("../assets/mailTemaplate");
const { sendEmail } = require("../sendEmail");

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please login.",
      });
    }
    const user = new userModel({
      name,
      email,
    });

    user.password = await bcrypt.hash(password, 10);

    const savedUser = await user.save();

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const mailTemaplate = verifyMailTemplate(token);

    await sendEmail(email, mailTemaplate.subject, mailTemaplate.html);

    // await sendMail(
    //   email,
    //   mailTemaplate.subject,
    //   mailTemaplate.text,
    //   mailTemaplate.html
    // );

    return res.status(201).json({
      success: true,
      message: `User registered successfully! A verification email has been sent to ${email}`,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const verifyMailLink = async (req, res) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    const userId = decoded.id;
    const user = await userModel.findByIdAndUpdate(userId, {
      mailVerified: true,
      new: true,
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Email verified successfully.You can now login to your account.",
    });
  } catch (err) {
    return res
      .status(401)
      .json({ message: err?.message || "Internal server error" });
  }
};

module.exports = { registerController, verifyMailLink };
