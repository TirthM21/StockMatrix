import nodemailer from "nodemailer";
import config from "../config.js";

const transporter = nodemailer.createTransport({
  host: config.smtp_host,
  port: config.smtp_port,
  secure: false,
  auth: {
    user: config.smtp_username,
    pass: config.smtp_password,
  },
});

export default transporter;
