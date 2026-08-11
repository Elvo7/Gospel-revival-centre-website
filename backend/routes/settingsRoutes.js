const express = require("express");

const router = express.Router();

const {
  getSettings,
  updateSettings,
  changeAdminPassword,
  getPublicSettings,
} = require("../controllers/settingsController");

// ==========================================
// PUBLIC CHURCH SETTINGS
// ==========================================

// Used by the public church website
router.get("/public", getPublicSettings);

// ==========================================
// ADMIN CHURCH SETTINGS
// ==========================================

router.get("/", getSettings);

router.put("/", updateSettings);

// ==========================================
// ADMIN PASSWORD
// ==========================================

router.put(
  "/admin-password",
  changeAdminPassword
);

module.exports = router;