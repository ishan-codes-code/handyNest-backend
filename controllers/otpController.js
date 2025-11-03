const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

let otpCache = {};
let cleanupTimer = null;

const sendMailOtp = async (req, res) => {
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  try {
    const userMail = req.query.mail;

    let mailOpt = {
      from: `"Handynest" <${process.env.EMAIL}>`,
      to: userMail,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}`, // fallback plain text
      html: `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f7; padding: 20px;">
      <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 30px; text-align: center;">
        <h2 style="color: #4f46e5; margin-bottom: 20px;">🔐 Verify Your Email</h2>
        <p style="font-size: 16px; color: #333; margin-bottom: 30px;">
          Use the following One Time Password (OTP) to complete your verification:
        </p>
        <div style="font-size: 28px; font-weight: bold; letter-spacing: 5px; color: #111; background: #f3f4f6; padding: 15px; border-radius: 8px; display: inline-block; margin-bottom: 30px;">
         ${otp}
        </div>
        <p style="font-size: 14px; color: #666; margin-bottom: 10px;">
          This OTP is valid for <b>10 minutes</b>. Do not share it with anyone.
        </p>
        <p style="font-size: 14px; color: #999;">
          If you didn’t request this, you can safely ignore this email.
        </p>
      </div>
    </div>
  `,
    };

    let info = await transporter.sendMail(mailOpt);

    console.log("Mail sent ", info.messageId);

    otpCache[userMail] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 min expiry
    };

    if (!cleanupTimer) {
      startCleanupJob();
    }

    return res.status(200).json({
      success: true,
      message: "Mail sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error });
  }
};

const verifyMailOtp = (req, res) => {
  // console.log(req.body);

  // return res.json({ success: true });
  const { userMail, inputOtp } = req.body;

  const record = otpCache[userMail];

  if (!record) {
    return res.status(404).json({ success: false, message: "No OTP found" });
  }

  if (record.expiresAt < Date.now()) {
    delete otpCache[userMail];
    return res.status(410).json({ success: false, message: "OTP expired" });
  }

  if (record.otp != inputOtp) {
    return res.status(401).json({ success: false, message: "Incorrect OTP" });
  }

  delete otpCache[userMail];

  // If cache is empty after deleting, stop cleanup timer
  if (Object.keys(otpCache).length === 0 && cleanupTimer) {
    stopCleanupJob();
  }
  return res
    .status(200)
    .json({ success: true, message: "Email verifed successfully" });
};

const startCleanupJob = () => {
  cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (let email in otpCache) {
      if (otpCache[email].expiresAt < now) {
        console.log(`Cleaned expired OTP for ${email}`);
        delete otpCache[email];
      }
    }
    if (Object.keys(otpCache).length === 0 && cleanupTimer) {
      stopCleanupJob();
    }
  }, 60 * 1000);
};

const stopCleanupJob = () => {
  clearInterval(cleanupTimer);
  cleanupTimer = null;
  console.log("Cleanup job stopped (no OTPs left).");
};

module.exports = { sendMailOtp, verifyMailOtp };
