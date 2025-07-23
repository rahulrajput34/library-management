import { defaultMailOptions, transporter } from "../nodemailer";

// mail when user login
export async function WelcomeEmail(
  recipientEmail: string,
  recipientName: string
) {
  const mailOptions = {
    ...defaultMailOptions,
    to: recipientEmail,
    subject: "Welcome to BookWise, Your Reading Companion!",
    text: `Welcome to BookWise, Your Reading Companion!

    Hi ${recipientName},

    Welcome to BookWise! We're excited to have you join our community of book enthusiasts. Explore a wide range of books, borrow with ease, and manage your reading journey seamlessly.

    Get started by logging in to your account: https://library-management-lilac-zeta.vercel.app/sign-in

    Happy reading,
    The BookWise Team

`,
    html: 
`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Welcome to BookWise</title>
  </head>
  <body style="margin:0;padding:0;background:#0d1117;color:#d7dadc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;max-width:100%;">
            <tr>
              <td style="padding:32px 24px 24px 24px;">
                <span style="font-size:32px;line-height:1;vertical-align:middle;">
                  📖
                </span>
                <span style="color:#ffffff;font-size:28px;font-weight:600;margin-left:8px;vertical-align:middle;">
                  BookWise
                </span>
              </td>
            </tr>

            <tr>
              <td style="border-bottom:1px solid #1c1f24;"></td>
            </tr>

            <tr>
              <td style="padding:40px 24px 24px 24px;color:#ffffff;">
                <h1 style="margin:0 0 24px 0;font-size:24px;font-weight:700;line-height:1.3;color:#ffffff;">
                  Welcome to BookWise, Your Reading&nbsp;Companion!
                </h1>

                <p style="margin:0 0 24px 0;font-size:16px;line-height:1.6;">
                  Hi <strong>${recipientName}</strong>,
                </p>

                <p style="margin:0 0 24px 0;font-size:16px;line-height:1.6;">
                  Welcome to BookWise! We're excited to have you join our community of book enthusiasts. Explore a&nbsp;wide range of books, borrow with ease, and manage your reading journey seamlessly.
                </p>

                <p style="margin:0 0 24px 0;font-size:16px;line-height:1.6;">
                  Get started by logging in to your account:
                </p>

                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 40px 0;">
                  <tr>
                    <td align="center" bgcolor="#F5E4C3" style="border-radius:6px;">
                      <a href="https://app.bookwise.com/login"
                         style="display:inline-block;padding:12px 36px;font-size:16px;font-weight:600;color:#000000;text-decoration:none;border-radius:6px;">
                        Login to BookWise
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="margin:0 0 4px 0;font-size:16px;line-height:1.6;">
                  Happy reading,
                </p>
                <p style="margin:0;font-size:16px;line-height:1.6;">
                  The&nbsp;BookWise&nbsp;Team
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:24px;text-align:center;font-size:12px;color:#8b949e;">
                ©${new Date().getFullYear()}BookWise. All&nbsp;rights&nbsp;reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
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
