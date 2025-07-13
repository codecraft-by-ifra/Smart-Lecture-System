const nodemailer = require("nodemailer");
require("dotenv").config();

console.log("Loaded credentials:", process.env.EMAIL_USER, process.env.EMAIL_PASS);

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // gett  from .env
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email sending failed", error);
    throw new Error("Email sending failed");
  }
};
console.log("Loaded credentials:", process.env.EMAIL_USER, process.env.EMAIL_PASS);


module.exports = sendEmail;
