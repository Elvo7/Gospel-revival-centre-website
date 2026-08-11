import { Routes, Route, Navigate } from "react-router-dom";

// ==========================================
// PUBLIC
// ==========================================
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";

// ==========================================
// ADMIN
// ==========================================
import Dashboard from "./pages/admin/Dashboard.jsx";
import Members from "./pages/admin/Members.jsx";
import Events from "./pages/admin/Events.jsx";
import Sermons from "./pages/admin/Sermons.jsx";
import Gallery from "./pages/admin/Gallery.jsx";
import Announcements from "./pages/admin/Announcements.jsx";
import Donations from "./pages/admin/Donations.jsx";
import Settings from "./pages/admin/Settings.jsx";

// ==========================================
// PROTECTED ROUTE
// ==========================================
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// ==========================================
// APP
// ==========================================
function App() {
  return (
    <Routes>

      {/* PUBLIC HOMEPAGE */}
      <Route
        path="/"
        element={<Home />}
      />

      {/* ADMIN LOGIN */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* DASHBOARD */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* MEMBERS */}
      <Route
        path="/admin/members"
        element={
          <ProtectedRoute>
            <Members />
          </ProtectedRoute>
        }
      />

      {/* EVENTS */}
      <Route
        path="/admin/events"
        element={
          <ProtectedRoute>
            <Events />
          </ProtectedRoute>
        }
      />

      {/* SERMONS */}
      <Route
        path="/admin/sermons"
        element={
          <ProtectedRoute>
            <Sermons />
          </ProtectedRoute>
        }
      />

      {/* GALLERY */}
      <Route
        path="/admin/gallery"
        element={
          <ProtectedRoute>
            <Gallery />
          </ProtectedRoute>
        }
      />

      {/* DONATIONS */}
      <Route
        path="/admin/donations"
        element={
          <ProtectedRoute>
            <Donations />
          </ProtectedRoute>
        }
      />

      {/* ANNOUNCEMENTS */}
      <Route
        path="/admin/announcements"
        element={
          <ProtectedRoute>
            <Announcements />
          </ProtectedRoute>
        }
      />

      {/* SETTINGS */}
      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* UNKNOWN ROUTES */}
      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}

export default App;