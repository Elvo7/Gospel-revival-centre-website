const express = require("express");
const router = express.Router();

const {
  getMembers,
  addMember,
  updateMember,
  deleteMember,
} = require("../controllers/memberController");

// GET all members
router.get("/", getMembers);

// ADD member
router.post("/", addMember);

// UPDATE member
router.put("/:id", updateMember);

// DELETE member
router.delete("/:id", deleteMember);

module.exports = router;