import { NavLink, useNavigate } from "react-router-dom";

const menu = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: "🏠",
  },
  {
    name: "Members",
    path: "/admin/members",
    icon: "👥",
  },
  {
    name: "Events",
    path: "/admin/events",
    icon: "📅",
  },
  {
    name: "Sermons",
    path: "/admin/sermons",
    icon: "🎤",
  },
  {
    name: "Gallery",
    path: "/admin/gallery",
    icon: "🖼️",
  },
  {
    name: "Donations",
    path: "/admin/donations",
    icon: "💰",
  },
  {
    name: "Announcements",
    path: "/admin/announcements",
    icon: "📢",
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: "⚙️",
  },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem("token");

    navigate("/", { replace: true });
  };

  return (
    <aside
      style={{
        width: 260,
        background: "#14532d",
        color: "#fff",
        minHeight: "100vh",
        padding: 20,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ==============================
          BRAND
      =============================== */}
      <div
        style={{
          marginBottom: 30,
          paddingBottom: 20,
          borderBottom: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          GRC CMS
        </h2>

        <p
          style={{
            margin: "6px 0 0",
            fontSize: 13,
            opacity: 0.75,
          }}
        >
          Gospel Revival Centre
        </p>
      </div>

      {/* ==============================
          NAVIGATION
      =============================== */}
      <nav style={{ flex: 1 }}>
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin"}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 16px",
              marginBottom: 8,
              color: "#fff",
              textDecoration: "none",
              borderRadius: 8,
              background: isActive
                ? "#15803d"
                : "transparent",
              fontWeight: isActive ? 600 : 400,
              transition: "all .2s ease",
            })}
          >
            <span
              style={{
                fontSize: 18,
                width: 24,
                textAlign: "center",
              }}
            >
              {item.icon}
            </span>

            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* ==============================
          LOGOUT
      =============================== */}
      <button
        type="button"
        onClick={handleLogout}
        style={{
          width: "100%",
          padding: "13px 16px",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: 8,
          background: "rgba(255,255,255,0.08)",
          color: "#fff",
          cursor: "pointer",
          fontSize: 15,
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span style={{ fontSize: 18 }}>🚪</span>
        <span>Logout</span>
      </button>
    </aside>
  );
}