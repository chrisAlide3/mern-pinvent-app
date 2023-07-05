const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(
  async (subject, message, send_to, sent_from, reply_to) => {
    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // tls: {
      //   rejectUnauthorised: false,
      // },
    });

    // Set options for the mail content
    const options = {
      from: sent_from,
      to: send_to,
      replyTo: reply_to,
      subject: subject,
      html: message,
    };

    // Send email
    transporter.sendMail(options, function (error, info) {
      if (error) {
        console.log(error);
      }
    });
  }
);

module.exports = sendEmail;
