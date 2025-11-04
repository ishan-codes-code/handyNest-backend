const userModel = require("../models/userModel");
const { workerModel, workerDetailsModel } = require("../models/workerModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const dummyHash = "$2b$10$abcdefghijklmnopqrstuvwxyz123456";
    const user = await userModel.findOne({ email });

    if (!user) {
      await bcrypt.compare(password, dummyHash);
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }
    if (!user.mailVerified) {
      return res.status(401).json({
        success: false,
        message: "Please verify your email before logging in.",
      });
    }
    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email password.",
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const workerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const dummyHash = "$2b$10$abcdefghijklmnopqrstuvwxyz123456";
    const worker = await workerModel
      .findOne({ email })
      .populate({ path: "details", populate: { path: "service" } });

    if (!worker) {
      await bcrypt.compare(password, dummyHash);
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isPassMatch = await bcrypt.compare(password, worker.password);
    if (!isPassMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email password.",
      });
    }

    const token = jwt.sign(
      {
        id: worker._id,
        email: worker.email,
        name: worker.name,
        workerDetails: worker.details,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful!",
      user: {
        id: worker._id,
        name: worker.name,
        email: worker.email,
        workerDetails: worker.details,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { login, workerLogin };
