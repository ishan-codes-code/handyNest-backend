const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

const sendMail = async (userMail, subject, text, body) => {
  try {
    let mailOpt = {
      from: `"Handynest" <${process.env.EMAIL}>`,
      to: userMail,
      subject,
      text,
      html: body,
    };
    let info = await transporter.sendMail(mailOpt);
    console.log("Mail sent", info.messageId);
    return true;
  } catch (err) {
    console.error("Error sending email:", err);
    return err;
  }
};

module.exports = { sendMail };
