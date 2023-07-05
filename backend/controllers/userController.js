const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must contain at least 6 characters");
  }

  // Check if email is not already registered
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400);
    throw new Error(
      "This email is already registered. Please go to the Sign-In page"
    );
  }

  // Encrypt Password before saving to DB (This is now done in the userModel)
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password, salt);

  // Create new User
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    const { _id, name, email, photo, phone, bio } = user;
    // Generate Token for Registered user
    const token = generateToken(_id);
    // Send HTTP-only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 Day
      sameSite: "none",
      secure: true,
    });
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Validation
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter an email and a password");
  }
  // Check if user exists
  const user = await User.findOne({ email: email });
  // User found
  if (user) {
    const { _id, name, email, password, photo, phone, bio } = user;
    // Check if password is correct
    const match = await bcrypt.compare(req.body.password, password);
    if (!match) {
      res.status(400);
      throw new Error("Invalid email or password");
    }
    // Generate Token
    const token = generateToken(_id);
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 Day
      sameSite: "none",
      secure: true,
    });
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      token,
    });
    // User not found
  } else {
    res.status(400);
    throw new Error("User doesn't exist. Please register");
  }
});

// Logout User
const logoutUser = asyncHandler(async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(400);
    throw new Error("User is already logged out");
  }
  // set cookie to expired
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({
    message: "User succesfully logged out",
  });
});

// Check if user is logged in
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (!verified) {
    return res.json(false);
  }
  const user = await User.findById(verified.id);
  if (user) {
    return res.json(true);
  } else {
    return res.json(false);
  }
});

// Get User profile
const getUser = asyncHandler(async (req, res) => {
  const { _id, name, email, photo, phone, bio } = req.user; // From auth middleware
  res.status(200).json({
    _id,
    name,
    email,
    photo,
    phone,
    bio,
  });
});

// Update User profile
const updateUser = asyncHandler(async (req, res) => {
  // Get actual user data
  const user = await User.findById(req.user._id);

  if (user) {
    const { name, email, photo, phone, bio } = user;
    // Update user data with req.body data. If not in the request just assign old value again
    user.email = email;
    user.name = req.body.name || name;
    user.photo = req.body.photo || photo;
    user.phone = req.body.phone || phone;
    user.bio = req.body.bio || bio;
    // save the updated user data and send response with updated values
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      photo: updatedUser.photo,
      phone: updatedUser.phone,
      bio: updatedUser.bio,
    });
  } else {
    res.status(404);
    throw new Error("Invalid user");
  }
});

// Change password
const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, password } = req.body;
  // Check if all fields entered
  if (!oldPassword || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }
  // Check length of new password
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }
  // Check if password valid
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  const passwordValid = await bcrypt.compare(oldPassword, user.password);
  if (!passwordValid) {
    res.status(400);
    throw new Error("Invalid password");
  }

  // Write new password to DB (Hashing is made in userModel)
  user.password = password;
  await user.save();
  res.status(200).json({ message: "Password updated succesfully" });
});

// Forgot password
const forgotPassword = asyncHandler(async (req, res) => {
  // Validate email
  const { email } = req.body;
  if (!email) {
    res.status(400);
    throw new Error("Please enter an email");
  }
  // Check if email is registered
  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(404);
    throw new Error("email is not registered. Please register first");
  }
  // Delete token if already in Token DB
  await Token.findOneAndDelete({ userId: user._id });

  // Generate reset Token
  let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
  // Hash generated Token to save to DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  if (!hashedToken) {
    res.status(500);
    throw new Error("Cannot generate reset Token. Try again later");
  }
  // Save hashed Token to DB
  await Token.create({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * 60 * 1000, // 30 minutes
  });

  // Construct reset URL
  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
  // Construct Reset Email
  const subject = "Password Reset Request";
  const message = `
    <h2>Hello ${user.name}</h2>
    <p>Please use the url below to reset your password<p>
    <p>This reset link is valid for only 30 minutes<p>

    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

    <p>Regards...</p>
    <p>Pinvent Team</p>
    `;
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;

  // Send email
  try {
    await sendEmail(subject, message, send_to, sent_from);
    res.status(201).json({
      success: true,
      message: "Reset email sent",
    });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent. Please try again");
  }
});

// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;
  // Check if password valid
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must contain a least 6 charachters");
  }
  // Hash reset token
  const hashedToken = await crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  // Get Token from DB
  const token = await Token.findOne({ token: hashedToken });
  if (!token) {
    res.status(404);
    throw new Error("Token not found");
  }
  // Check if token expired
  if (Date.now() > token.expiresAt) {
    await token.deleteOne({ token: token.token });
    res.status(400);
    throw new Error(
      "Reset link has expired. Please click on Forget Password to get a new one"
    );
  }

  // If token valid write new password to DB
  const user = await User.findOne({ _id: token.userId });
  if (user) {
    user.password = password;
    await user.save();
    // Delete token
    await token.deleteOne({ token: token.token });
    // Login user
    // const loginToken = await generateToken(user._id);
    // res.cookie("token", loginToken, {
    //   path: "/",
    //   httpOnly: true,
    //   expires: new Date(Date.now() + 1000 * 86400), // 1 Day
    //   sameSite: "none",
    //   secure: true,
    // });
    res
      .status(200)
      .json({ message: "Password reset succesfull, please Login" });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
};
