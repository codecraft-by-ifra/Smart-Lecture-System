const User = require('../models/User');
const bcrypt = require('bcryptjs');
const sendEmail = require("../utils/sendEmail");
const Teacher = require('../models/Teacher');


const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Check existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already exists' });
  }

   //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);


  // Save user
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();
   // Save teacher for notifications
  const newTeacher = new Teacher({ name, email });
  await newTeacher.save();
  res.status(201).json({ message: 'User registered successfully' });
};

// ..................login page..........................................
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  res.status(200).json({ message: 'Login successful' });
};

//................................forget password...........
const forgetPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Email not registered" });
  }

  const code = Math.floor(100000 + Math.random() * 900000); // 6-digit code

  user.resetCode = code;
  user.resetCodeExpires = Date.now() + 10 * 60 * 1000; // valid 10 mins
  await user.save();

  await sendEmail(email, "Password Reset Code", `Your reset code is: ${code}`);

  res.status(200).json({ message: "Reset code sent to your email" });
};

//......................................reset password............................
const resetPassword = async (req, res) => {
  const { email, code, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user || user.resetCode !== code || user.resetCodeExpires < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired code" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.resetCode = null;
  user.resetCodeExpires = null;

  await user.save();
  res.status(200).json({ message: "Password reset successful" });
};




module.exports = { registerUser , loginUser , forgetPassword , resetPassword };
