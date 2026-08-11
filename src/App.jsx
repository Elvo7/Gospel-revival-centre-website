import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import Home from "./Pages/Home";

import Login from "./Pages/login";
import Dashboard from "./Pages/admin/Dashboard";
import Members from "./Pages/admin/Members";
import Events from "./Pages/admin/Events";
import Sermons from "./Pages/admin/Sermons";
import Gallery from "./Pages/admin/Gallery";
import Donations from "./Pages/admin/Donations";
import Announcements from "./Pages/admin/Announcements";
import Settings from "./Pages/admin/Settings";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Home />
      <BackToTop />
      <Footer />
    </>
  );
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <Routes>

      {/* =========================
          PUBLIC WEBSITE
      ========================= */}
      <Route path="/" element={<PublicLayout />} />

      {/* =========================
          ADMIN LOGIN
      ========================= */}
      <Route path="/login" element={<Login />} />

      {/* =========================
          ADMIN DASHBOARD
      ========================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* =========================
          MEMBERS
      ========================= */}
      <Route
        path="/admin/members"
        element={
          <ProtectedRoute>
            <Members />
          </ProtectedRoute>
        }
      />

      {/* =========================
          EVENTS
      ========================= */}
      <Route
        path="/admin/events"
        element={
          <ProtectedRoute>
            <Events />
          </ProtectedRoute>
        }
      />

      {/* =========================
          SERMONS
      ========================= */}
      <Route
        path="/admin/sermons"
        element={
          <ProtectedRoute>
            <Sermons />
          </ProtectedRoute>
        }
      />

      {/* =========================
          GALLERY
      ========================= */}
      <Route
        path="/admin/gallery"
        element={
          <ProtectedRoute>
            <Gallery />
          </ProtectedRoute>
        }
      />

      {/* =========================
          DONATIONS
      ========================= */}
      <Route
        path="/admin/donations"
        element={
          <ProtectedRoute>
            <Donations />
          </ProtectedRoute>
        }
      />

      {/* =========================
          ANNOUNCEMENTS
      ========================= */}
      <Route
        path="/admin/announcements"
        element={
          <ProtectedRoute>
            <Announcements />
          </ProtectedRoute>
        }
      />

      {/* =========================
          SETTINGS
      ========================= */}
      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* =========================
          UNKNOWN ROUTES
      ========================= */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default App;