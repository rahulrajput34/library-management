import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient, resend } from "@upstash/qstash";
import config from "@/lib/config";

// setup the workflow client
export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

// setup the qstash client
const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

// setup the send email using the qstash with resend email
export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  await qstashClient.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: config.env.resendToken }),
    },
    body: {
      from: "JS Mastery <contact@adrianjsmastery.com>",
      to: [email],
      subject,
      html: message,
    },
  });
};
