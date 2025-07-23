import { defaultMailOptions, transporter } from "../nodemailer";

/**
 * Sends the confirmation e-mail when user borrowed a book.
 */
export async function BorrowedConfirm(
  recipientEmail: string,
  recipientName: string,
  bookTitle: string,
  borrowDate: string, // e.g. "22 Jul 2025"
  dueDate: string // e.g. "05 Aug 2025"
) {
  const mailOptions = {
    ...defaultMailOptions,
    to: recipientEmail,
    subject: "You've Borrowed a Book! 📚",
    text: `You've Borrowed a Book!

      Hi ${recipientName},

      You've successfully borrowed “${bookTitle}”. Here are the details:
      • Borrowed On: ${borrowDate}
      • Due Date:     ${dueDate}

      Enjoy your reading, and don't forget to return the book on time!

      View your borrowed books: https://app.bookwise.com/borrowed

      Happy reading,
      The BookWise Team
`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>You've Borrowed a Book!</title>
</head>

<body style="margin:0;padding:0;background:#0d1117;color:#d7dadc; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI', Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation"
               style="width:600px;max-width:100%;">
          <!-- Header-->
          <tr>
            <td style="padding:32px 24px 24px 24px;">
              <span style="font-size:32px;line-height:1;vertical-align:middle;">📖</span>
              <span style="color:#ffffff;font-size:28px;font-weight:600;margin-left:8px;
                           vertical-align:middle;">BookWise</span>
            </td>
          </tr>
          <tr><td style="border-bottom:1px solid #1c1f24;"></td></tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 24px 24px 24px;color:#ffffff;">
              <h1 style="margin:0 0 24px 0;font-size:24px;font-weight:700;line-height:1.3;">
                You've Borrowed a Book!
              </h1>
              <p style="margin:0 0 24px 0;font-size:16px;line-height:1.6;">
                Hi <strong>${recipientName}</strong>,
              </p>
              <p style="margin:0 0 24px 0;font-size:16px;line-height:1.6;">
                You've successfully borrowed <strong>“${bookTitle}”</strong>. Here are the details:
              </p>
              <ul style="margin:0 0 24px 18px;padding:0;font-size:16px;line-height:1.6;">
                <li style="margin-bottom:8px;">
                  Borrowed On:
                  <strong style="color:#E6D2B0;">${borrowDate}</strong>
                </li>
                <li>
                  Due Date:
                  <strong style="color:#E6D2B0;">${dueDate}</strong>
                </li>
              </ul>
              <p style="margin:0 0 32px 0;font-size:16px;line-height:1.6;">
                Enjoy your reading, and don't forget to return the book on time!
              </p>
              <!-- CTA button -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 40px 0;">
                <tr>
                  <td bgcolor="#E6D2B0" align="center" style="border-radius:6px;">
                    <a href="https://library-management-lilac-zeta.vercel.app/my-profile"
                       style="display:inline-block;padding:12px 36px;font-size:16px;font-weight:600;
                              color:#000000;text-decoration:none;border-radius:6px;">
                      View Borrowed Books
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 4px 0;font-size:16px;line-height:1.6;">Happy reading,</p>
              <p style="margin:0;font-size:16px;line-height:1.6;">The BookWise Team</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px;text-align:center;font-size:12px;color:#8b949e;">
              © ${new Date().getFullYear()} BookWise. All rights reserved.
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
    console.log("Borrowed-book email sent:", info.messageId);
  } catch (err) {
    console.error("Error sending borrowed-book email:", err);
    throw err;
  }
}
