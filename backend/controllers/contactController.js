const asyncHandler = require("express-async-handler");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/userModel");

const contactUs = asyncHandler(async (req, res) => {
  const { subject, message } = req.body;

  // Validation
  if (!subject || !message) {
    res.status(400);
    throw new Error("Please enter a subject and a message");
  }

  // Get user from DB
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(400);
    throw new Error("Invalid user");
  }

  // Send email
  const send_to = process.env.EMAIL_USER;
  const sent_from = process.env.EMAIL_USER;
  const reply_to = user.email;

  try {
    await sendEmail(subject, message, send_to, sent_from, reply_to);
    res.status(201).json({ success: true, message: "Mail sent succesfully" });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

module.exports = { contactUs };
