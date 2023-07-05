const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    // Abort if no cookie token
    res.status(401);
    throw new Error("Not authorized, please Login");
  }

  // Verify token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (!verified) {
    res.status(401);
    throw new Error("Not authorized, wrong token");
  }

  // Get user from token ID
  const user = await User.findById(verified.id).select("-password");
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  req.user = user;
  next();
});

module.exports = protect;
