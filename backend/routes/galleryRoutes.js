const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  getGallery,
  addGallery,
  deleteGallery,
} = require("../controllers/galleryController");

// Get all gallery images
router.get("/", getGallery);

// Upload image
router.post("/", upload.single("image"), addGallery);

// Delete image
router.delete("/:id", deleteGallery);

module.exports = router;