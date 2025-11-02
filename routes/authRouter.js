const { login, workerLogin } = require("../controllers/authController");
const { logout } = require("../controllers/logout");
const { sendMailOtp, verifyMailOtp } = require("../controllers/otpController");
const {
  registerController,
  verifyMailLink,
} = require("../controllers/register");
const { authMiddleware } = require("../middlewares/authMiddleware");

const authRouter = require("express").Router();

authRouter.get("/verifyMail", sendMailOtp);
authRouter.get("/user/verifyMail", verifyMailLink);
authRouter.post("/verifyMailOtp", verifyMailOtp);
authRouter.post("/register", registerController);
authRouter.post("/login", login);
authRouter.post("/workerLogin", workerLogin);
authRouter.post("/autoLogin", authMiddleware);
authRouter.post("/logout", logout);

module.exports = authRouter;
