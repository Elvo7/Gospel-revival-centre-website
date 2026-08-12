require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// ==========================================
// PRODUCTION CONFIGURATION
// ==========================================

const PORT = process.env.PORT || 5000;

const FRONTEND_URL =
  "https://gospel-revival-centre-website-ipfkmes4y-elvo7s-projects.vercel.app";

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
    service: "Gospel Revival Centre API",
  });
});

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
const galleryRoutes = require("./routes/galleryRoutes");
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
app.use("/api/gallery", galleryRoutes);
app.use("/api/settings", settingsRoutes);

// ==========================================
// ROOT ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Gospel Revival Centre API is running...",
  });
});

// ==========================================
// 404 HANDLER
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found.",
  });
});

// ==========================================
// GLOBAL ERROR HANDLER
// ==========================================

app.use((err, req, res, next) => {
  console.error("Server error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error.",
  });
});

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Gospel Revival Centre API running on port ${PORT}`);
});