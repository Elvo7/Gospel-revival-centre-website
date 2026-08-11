const express = require("express");

const router = express.Router();

const {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
} = require("../controllers/authController");

// ==========================================
// AUTHENTICATION
// ==========================================

router.post("/register", register);

router.post("/login", login);

// ==========================================
// ADMIN ACCOUNT
// ==========================================

router.get("/profile", getProfile);

router.put("/profile", updateProfile);

router.put(
  "/change-password",
  changePassword
);

module.exports = router;