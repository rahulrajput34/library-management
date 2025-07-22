import { defaultMailOptions, transporter } from "../nodemailer";

export async function sendWelcomeEmail(
  recipientEmail: string,
  recipientName: string
) {
  const mailOptions = {
    ...defaultMailOptions,
    to: recipientEmail,
    subject: "Welcome to Library Management",
    text: `Hello ${recipientName},
        Welcome aboard!
            • Our digital library is open 24/7.
            • Expert librarians are here to help.
            • Access thousands of books, journals, and databases.
            • All resources are completely free.

        Reply anytime if you need assistance.

        Happy reading!
        The Library Management Team
`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Welcome to Library Management</title>
  <style>
    body { margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f6f8; }
    .header { background-color:#004080; color:#ffffff; padding:20px; text-align:center; }
    .content { padding:30px; background-color:#ffffff; margin:20px; border-radius:8px; }
    h1 { margin-top:0; }
    ul { padding-left:20px; }
    .footer { text-align:center; font-size:12px; color:#888888; padding:20px; }
    a { color:#004080; text-decoration:none; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Welcome, ${recipientName}!</h1>
  </div>
  <div class="content">
    <p>Thank you for joining <strong>Library Management</strong>. We’re excited to have you.</p>
    <p><strong>What’s next?</strong></p>
    <ul>
      <li>Access our digital library <strong>24/7</strong>.</li>
      <li>Connect with expert librarians at any time.</li>
      <li>Browse thousands of books, journals, and databases.</li>
      <li>Enjoy all resources at no cost.</li>
    </ul>
    <p>If you have any questions, just <a href="mailto:support@library.com">reply to this email</a>.</p>
    <p>Happy reading!</p>
  </div>
  <div class="footer">
    © 2025 Library Management. All rights reserved.
  </div>
</body>
</html>
`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Welcome email sent:", info.messageId);
  } catch (err) {
    console.error("Error sending welcome email:", err);
    throw err;
  }
}
