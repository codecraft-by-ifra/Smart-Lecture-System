const express = require("express");
const router = express.Router();
const Timetable = require("../models/Timetable");

// Save or update timetable
const {
  saveTimetable,
  getTimetable,
  updateTimetable,
  deleteTimetable
} = require('../controllers/timetableController');

router.get('/all', async (req, res) => {
  try {
    const teachers = await Timetable.find({}, { teacherName: 1, _id: 0 });
    res.json(teachers); //  returns teacher aray
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post('/save', saveTimetable);
router.get('/:name', getTimetable);
router.put('/update/:name', updateTimetable);
router.delete('/delete/:name', deleteTimetable);

module.exports = router;