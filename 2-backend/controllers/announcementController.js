const Announcement = require('../models/Announcement');

// GET all
exports.getAll = async (req, res) => {
  const data = await Announcement.find().sort({ _id: -1 });
  res.json(data);
};

// POST
exports.create = async (req, res) => {
  try {
    // Unpin all old announcements
    await Announcement.updateMany({}, { $set: { pinned: false } });

    // Create new and pin it
    const announcement = new Announcement({
      content: req.body.content,
      pinned: true
    });

    const saved = await announcement.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create announcement' });
  }
};


// PUT (edit)
exports.update = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const updated = await Announcement.findByIdAndUpdate(id, {
    content,
    date: new Date().toLocaleString('en-US')
  }, { new: true });
  res.json({ message: 'Updated', announcement: updated });
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const deleted = await Announcement.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting" });
  }
};

