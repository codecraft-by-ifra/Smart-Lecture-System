const express = require('express');
const router = express.Router();
const controller = require('../controllers/announcementController');
const Announcement = require('../models/Announcement');


router.get('/', async (req, res) => {
  const announcements = await Announcement.find().sort({ createdAt: -1 }); 
  res.json(announcements);
});
// GET latest announcement only
router.get('/latest', async (req, res) => {
  const latest = await Announcement.findOne({ pinned: true }).sort({ createdAt: -1 });

  if (!latest) {
    return res.status(404).json({ message: "No announcement found" });
  }

  res.json(latest);
});




router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
