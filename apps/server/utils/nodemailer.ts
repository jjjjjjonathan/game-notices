import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: 'smtp.useplunk.com',
  port: 465,
  secure: true,
  auth: {
    user: 'plunk',
    pass: process.env.SMTP_PASSWORD,
  },
  pool: true,
});
