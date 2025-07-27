import { transporter, defaultMailOptions } from "../nodemailer";

/**
 * Send an “Account rejected” email to the student.
 */
export async function AccountRejected(
  recipientEmail: string,
  recipientName: string
) {
  const subject = "BookWise account request denied";

  const mailOptions = {
    ...defaultMailOptions,
    to: recipientEmail,
    subject,
    text: `Hi ${recipientName},

Unfortunately we couldn’t verify your ID card and cannot approve your BookWise account at this time.

Feel free to resubmit your request once you have a valid ID.

Regards,
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
          <!-- Logo -->
          <tr><td style="padding:32px 24px 24px;">
            <span style="font-size:32px;">📖</span>
            <span style="color:#ffffff;font-size:28px;font-weight:600;margin-left:8px;">BookWise</span>
          </td></tr>

          <tr><td style="border-bottom:1px solid #1c1f24;"></td></tr>

          <!-- Main content -->
          <tr><td style="padding:40px 24px 24px;color:#ffffff;">
            <h1 style="margin:0 0 24px;font-size:24px;font-weight:700;">Account Request Denied</h1>

            <p style="margin:0 0 24px;font-size:16px;">Hi <strong>${recipientName}</strong>,</p>

            <p style="margin:0 0 24px;font-size:16px;">
              Unfortunately we couldn’t verify your ID card and can’t approve your BookWise account at this time.
            </p>

            <p style="margin:0 0 24px;font-size:16px;">
              Feel free to resubmit your request once you have a valid ID.&nbsp;If you believe this was an error, please contact our support team.
            </p>

            <p style="margin:0 0 4px;font-size:16px;">Regards,</p>
            <p style="margin:0;font-size:16px;">The BookWise Team</p>
          </td></tr>

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
    console.error("Error sending account‑rejected email:", err);
    throw err;
  }
}
