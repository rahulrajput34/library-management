import { Client as WorkflowClient } from "@upstash/workflow";
import config from "@/lib/config";

// passing envs for client
export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

interface SendEmailArgs {
  email: string;
  subject: string;
  message: string;
  name?: string;
}

export const sendEmail = async ({
  email,
  subject,
  message,
  name = email.split("@")[0],
}: SendEmailArgs) => {
  const serviceId = config.env.emailJs.serviceId;
  const templateId = config.env.emailJs.templateId;
  const publicKey = config.env.emailJs.publicKey;

  // Map fields to the placeholders used in your EmailJS template.
  const params = {
    user_name: name,
    user_email: email,
    subject,
    message,
  };

  // send the email
  await emailjs.send(serviceId, templateId, params, { publicKey });
};
