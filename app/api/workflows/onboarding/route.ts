import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { serve } from "@upstash/workflow/nextjs";
import { eq } from "drizzle-orm";
import { sendEmailImmediate } from "@/lib/workflow";

type UserState = "non-active" | "active";

type InitialData = {
  email: string;
  fullName: string;
};

const ONE_DAY_IN_MS = 60 * 60 * 24 * 1000;
const THREE_DAYS_IN_MS = ONE_DAY_IN_MS * 3;
const THIRTY_DAYS_IN_MS = ONE_DAY_IN_MS * 30;

// if the user is active or not during that time period
const getUserState = async (email: string): Promise<UserState> => {
  // get the user from the database according to the email
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  // if the user is not found, return "non-active"
  if (user.length === 0) {
    return "non-active";
  }

  // if user is there, then check the last activity date of the user
  const lastActivityDate = new Date(user[0].lastActivityDate!);
  const now = new Date();

  // get the time difference between today and last activity date
  const timeDifference = now.getTime() - lastActivityDate.getTime();

  // if time is between 3 days and 1 month, then return "non-active" else return "active"
  if (timeDifference > THREE_DAYS_IN_MS && timeDifference < THIRTY_DAYS_IN_MS) {
    return "non-active";
  }
  return "active";
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;

  // welcome email
  await context.run("new-signup", async () => {
    await sendEmailImmediate({
      email,
      subject: "Welcome to Library Management",
      message: `
            <p>Hi ${fullName},</p>
            <p>Thank you for signing up to Library Management. We are excited to have you as a part of our community.</p>
            <p>Here are some things you can do to get started:</p>
            <ul>
              <li>Explore our collection of books, magazines, and other resources.</li>
              <li>Sign up for our newsletter to stay updated on the latest news and events.</li>
              <li>Join our community and connect with other members.</li>`,
      name: fullName,
    });
  });

  // scheduled to send email to non-active users every 3 days
  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3);

  // scheduled to send email to non-active users every 1 month
  while (true) {
    const state = await context.run("check-user-state", async () => {
      // get the user state..
      return await getUserState(email);
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmailImmediate({
          email,
          subject: "Are you still interested in Library Management?",
          message: `
            <p>Hi ${fullName},</p>
            <p>Thank you for being a part of our community. We hope you are enjoying our services and finding value in our library.</p>
            <p>However, we understand that time can pass, and we want to remind you that we are here to support you.</p>
            <p>Here are some things we would like to remind you of:</p>
            <ul>
              <li>Our library is constantly growing, and we are always adding new resources.</li>
              <li>We offer various services, such as book lending, borrowing, and reading.</li>
              <li>We also have a community forum where you can connect with other members and share your thoughts and ideas.</li>
              <li>Finally, we want to remind you that we are here to support you, and we are always ready to help you.</li>
            </ul>
              <p>Thank you for being a part of our community. We look forward to seeing you again.</p>
              <p>Best regards,</p>
              <p>The Library Management Team</p>
          `,
          name: fullName,
        });
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmailImmediate({
          email,
          subject: "Welcome back to Library Management!",
          message: `
              <p>Hi ${fullName},</p>
              <p>Thank you for being a part of our community. We are excited to have you as a member.</p>
              <p>Here are some things you can do to get started:</p>
              <ul>
                <li>Explore our collection of books, magazines, and other resources.</li>
                <li>Sign up for our newsletter to stay updated on the latest news and events.</li>
                <li>Join our community and connect with other members.</li>
                <li>Get in touch with us if you have any questions or need assistance.</li>
              </ul>
                <p>We hope you enjoy your time with us and that you continue to find value in our library.</p>
                <p>Best regards,</p>
                <p>The Library Management Team</p>
          `,
          name: fullName,
        });
      });
    }

    // wait for 1 month before checking again
    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
  }
});
