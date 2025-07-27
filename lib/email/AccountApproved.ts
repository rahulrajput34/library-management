import { transporter, defaultMailOptions } from "../nodemailer";

/**
 * Send an “Account approved” email to the student.
 */
export async function AccountApproved(
  recipientEmail: string,
  recipientName: string
) {
  const subject = "Your BookWise account has been approved ✨";

  const mailOptions = {
    ...defaultMailOptions,
    to: recipientEmail,
    subject,
    text: `Hi ${recipientName},

Good news—your BookWise account is now active! 
You can browse the library, borrow books and manage your reading journey.

Log in here: ${process.env.APP_URL}/login

Welcome aboard!
The BookWise Team
`,
    html: /*html*/ `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${subject}</title>
  </head>
  <body style="margin:0;padding:0;background:#0d1117;color:#d7dadc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;max-width:100%;">
          <!-- Logo headline -->
          <tr><td style="padding:32px 24px 24px 24px;">
            <span style="font-size:32px;">📖</span>
            <span style="color:#ffffff;font-size:28px;font-weight:600;margin-left:8px;">BookWise</span>
          </td></tr>

          <tr><td style="border-bottom:1px solid #1c1f24;"></td></tr>

          <!-- Main content -->
          <tr><td style="padding:40px 24px 24px 24px;color:#ffffff;">
            <h1 style="margin:0 0 24px;font-size:24px;font-weight:700;">Your BookWise Account Has Been Approved!</h1>

            <p style="margin:0 0 24px;font-size:16px;">Hi <strong>${recipientName}</strong>,</p>

            <p style="margin:0 0 24px;font-size:16px;">
              Congratulations! Your BookWise account is now active. You can browse our library, borrow books and enjoy every feature of your new account.
            </p>

            <!-- CTA button -->
            <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 40px;">
              <tr><td align="center" bgcolor="#F5E4C3" style="border-radius:6px;">
                <a href="${process.env.APP_URL}/login"
                   style="display:inline-block;padding:12px 40px;font-size:16px;font-weight:600;color:#000;text-decoration:none;border-radius:6px;">
                  Log in to BookWise
                </a>
              </td></tr>
            </table>

            <p style="margin:0 0 4px;font-size:16px;">Welcome aboard,</p>
            <p style="margin:0;font-size:16px;">The BookWise Team</p>
          </td></tr>

          <!-- Footer -->
          <tr><td style="padding:24px;text-align:center;font-size:12px;color:#8b949e;">
            ©${new Date().getFullYear()} BookWise. All rights reserved.
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>
`,
  };

  try {
    return await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Error sending account‑approved email:", err);
    throw err;
  }
}
