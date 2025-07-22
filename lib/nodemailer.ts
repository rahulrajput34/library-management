import nodemailer from "nodemailer";
import config from "./config";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.env.nodemailer.email,
    pass: config.env.nodemailer.password,
  },
});

export const defaultMailOptions = {
  from: config.env.nodemailer.email,  
};
