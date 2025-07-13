const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  pinned: { type: Boolean, default: true }  //for pin
});

module.exports = mongoose.model('Announcement', announcementSchema);
