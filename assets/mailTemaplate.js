const verifyMailTemplate = (token) => {
  const link = `${process.env.ALLOWED_ORIGIN}/verifyMail/${token}`;
  return {
    subject: "Email Verification - HandyNest",
    text: `Please verify your email by clicking the following link: ${link}`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
            line-height: 1.6;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background-color: #000000;
            padding: 40px 20px;
            text-align: center;
            color: white;
        }
        
        .header h1 {
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .content {
            padding: 40px 30px;
            color: #000000;
        }
        
        .content p {
            font-size: 16px;
            margin-bottom: 20px;
            color: #333333;
        }
        
        .verify-button {
            display: inline-block;
            padding: 16px 40px;
            background-color: #000000;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0;
            transition: all 0.2s ease;
            border: 2px solid #000000;
        }
        
        .verify-button:hover {
            background-color: #ffffff;
            color: #000000;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        
        .button-container {
            text-align: center;
            margin: 30px 0;
        }
        
        .divider {
            margin: 30px 0;
            border: none;
            border-top: 1px solid #e0e0e0;
        }
        
        .alternative-link {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border: 1px solid #e0e0e0;
        }
        
        .alternative-link p {
            font-size: 14px;
            color: #666666;
            margin-bottom: 10px;
        }
        
        .link-text {
            color: #000000;
            word-break: break-all;
            font-size: 13px;
            font-weight: 500;
        }
        
        .footer {
            background-color: #f8f9fa;
            padding: 30px;
            text-align: center;
            color: #666666;
            font-size: 14px;
            border-top: 1px solid #e0e0e0;
        }
        
        .footer p {
            margin: 5px 0;
        }
        
        .footer a {
            color: #000000;
            text-decoration: none;
            margin: 0 10px;
            font-weight: 500;
        }
        
        .footer a:hover {
            text-decoration: underline;
        }
        
        .security-note {
            background-color: #f8f9fa;
            border-left: 4px solid #000000;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        
        .security-note p {
            font-size: 14px;
            color: #000000;
            margin: 0;
        }
        
        @media only screen and (max-width: 600px) {
            .content {
                padding: 30px 20px;
            }
            
            .header h1 {
                font-size: 24px;
            }
            
            .verify-button {
                padding: 14px 30px;
                font-size: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <h1>✓ Welcome!</h1>
            <p style="margin: 0; opacity: 0.9;">Just one more step to get started</p>
        </div>
        
        <!-- Content -->
        <div class="content">
            <p>Hi there,</p>
            
            <p>Thank you for signing up! To complete your registration and activate your account, please verify your email address by clicking the button below.</p>
            
            <div class="button-container">
                <a href="${link}" class="verify-button">
                    Verify Email Address
                </a>
            </div>
            
            <p>This verification link will expire in <strong>24 hours</strong> for security reasons.</p>
            
            <hr class="divider">
            
            <!-- Alternative Link -->
            <div class="alternative-link">
                <p><strong>Button not working?</strong> Copy and paste this link into your browser:</p>
                <p class="link-text">${link}</p>
            </div>
            
            <!-- Security Note -->
            <div class="security-note">
                <p><strong>⚠ Security Note:</strong> If you didn't create an account with us, please ignore this email or contact our support team.</p>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p style="color: #000000;"><strong>Handynest</strong></p>
           
            <p style="margin-top: 15px;">
                <a href="#">Help Center</a> |
                <a href="https://handynest.netlify.app/contact">Contact Us</a>
            </p>
            <p style="margin-top: 15px; font-size: 12px;">
                © 2025 Handynest. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>`,
  };
};

module.exports = { verifyMailTemplate };
