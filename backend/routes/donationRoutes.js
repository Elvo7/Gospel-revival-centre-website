const express = require("express");
const router = express.Router();

const {
  getDonations,
  addDonation,
  updateDonation,
  deleteDonation,
} = require("../controllers/donationController");

// GET all donations
router.get("/", getDonations);

// ADD donation
router.post("/", addDonation);

// UPDATE donation
router.put("/:id", updateDonation);

// DELETE donation
router.delete("/:id", deleteDonation);

module.exports = router;