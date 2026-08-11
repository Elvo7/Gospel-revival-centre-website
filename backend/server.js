require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());
app.use(express.json());

// ==========================================
// ROUTES
// ==========================================

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const memberRoutes = require("./routes/memberRoutes");
const sermonRoutes = require("./routes/sermonRoutes");
const eventRoutes = require("./routes/eventRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const donationRoutes = require("./routes/donationRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

// ==========================================
// API ROUTES
// ==========================================

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/sermons", sermonRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/settings", settingsRoutes);

// ==========================================
// ROOT ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Gospel Revival Centre API is running...",
  });
});

// ==========================================
// START SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});