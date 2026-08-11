const express = require("express");
const router = express.Router();

const {
  getAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} = require("../controllers/announcementController");

// GET all announcements
router.get("/", getAnnouncements);

// ADD announcement
router.post("/", addAnnouncement);

// UPDATE announcement
router.put("/:id", updateAnnouncement);

// DELETE announcement
router.delete("/:id", deleteAnnouncement);

module.exports = router;