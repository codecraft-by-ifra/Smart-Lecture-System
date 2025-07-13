const Teacher = require('../models/Teacher');
const Timetable = require('../models/Timetable');

// Add new teacher
exports.addTeacher = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const exists = await Teacher.findOne({ name });
    if (exists) return res.status(400).json({ message: "Teacher already exists" });

    const teacher = await Teacher.create({ name });
    res.status(201).json(teacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all teachers
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({ name: 1 });
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update teacher name
exports.updateTeacher = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const updated = await Teacher.findByIdAndUpdate(id, { name }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete teacher and their timetable
exports.deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findByIdAndDelete(id);
    await Timetable.deleteOne({ teacherName: teacher.name });
    res.json({ message: "Teacher and timetable deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
