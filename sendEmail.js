import fetch from "node-fetch";

async function sendEmail(to, subject, htmlContent) {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": process.env.BREVO_API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "HandyNest", email: "support@handynest.netlify.app" },
      to: [{ email: to }],
      subject,
      htmlContent,
    }),
  });

  const data = await response.json();
  console.log("Brevo API response:", data);
}

module.exports = { sendEmail };
