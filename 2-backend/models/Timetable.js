const mongoose = require('mongoose');

const LectureSchema = new mongoose.Schema({
  subject: String,
  class: String,
  time: String
});

const TimetableSchema = new mongoose.Schema({
  teacherName: {
    type: String,
    required: true
  },
  timetable: {
    type: [LectureSchema],
    default: []
  }
});

module.exports = mongoose.model('Timetable', TimetableSchema);
