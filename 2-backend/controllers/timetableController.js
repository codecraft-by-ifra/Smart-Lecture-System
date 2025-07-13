const Timetable = require('../models/Timetable');

// Save timetable
exports.saveTimetable = async (req, res) => {
  try {
    const { name, timetable } = req.body;
    if (!name || !Array.isArray(timetable) || timetable.length !== 25) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    // Check if timetable already existsx
    const exists = await Timetable.findOne({ teacherName: name });
    if (exists) {
      return res.status(400).json({ message: "Timetable already exists. Use update instead." });
    }


    const saved = await Timetable.create({ teacherName: name, timetable });
    res.status(201).json({ message: "Timetable saved", saved });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get timetable by teacher name
exports.getTimetable = async (req, res) => {
  try {
    const { name } = req.params;
    const timetable = await Timetable.findOne({ teacherName: name });
    if (!timetable) {
      return res.json({ timetable: [] }); // Empty if not found
    }
    res.json(timetable);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update timetable
exports.updateTimetable = async (req, res) => {
  try {
    const { name } = req.params;
    const { timetable } = req.body;

    if (!name || !Array.isArray(timetable) || timetable.length === 0) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const updated = await Timetable.findOneAndUpdate(
      { teacherName: name },
      { timetable },
      { upsert: true, new: true }  // Create if doesn't exist
    );

    res.json({ message: "Timetable updated or created", updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Delete timetable
exports.deleteTimetable = async (req, res) => {
  try {
    const { name } = req.params;
    await Timetable.deleteOne({ teacherName: name });
    res.json({ message: "Timetable deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
