const express = require("express");

const router = express.Router();

const {
  getSermons,
  getSermon,
  addSermon,
  updateSermon,
  deleteSermon,
} = require("../controllers/sermonController");

router.get("/", getSermons);
router.get("/:id", getSermon);

router.post("/", addSermon);

router.put("/:id", updateSermon);

router.delete("/:id", deleteSermon);

module.exports = router;