const express = require("express");

const router = express.Router();

const {
  getEvents,
  getEvent,
  addEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

router.get("/", getEvents);
router.get("/:id", getEvent);

router.post("/", addEvent);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;