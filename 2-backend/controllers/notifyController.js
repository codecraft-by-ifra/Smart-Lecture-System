const User = require('../models/User');
const transporter = require('../utils/mailer');

exports.sendNotification = async (req, res) => {
  try {
    const users = await User.find({}, { email: 1, _id: 0 });
    const emails = users.map(u => u.email);

    if (emails.length === 0) {
      return res.status(400).json({ message: "No registered users found." });
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: emails.join(','), 
      subject: "Timetable Update",
      text: "Your timetable is updated. Please check the portal."
    });

    res.json({ message: "Emails sent successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
