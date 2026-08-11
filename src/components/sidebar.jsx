import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menu = [
    { name: "Dashboard", path: "/admin" },
    { name: "Members", path: "/admin/members" },
    { name: "Events", path: "/admin/events" },
    { name: "Sermons", path: "/admin/sermons" },
    { name: "Gallery", path: "/admin/gallery" },
    { name: "Donations", path: "/admin/donations" },
    { name: "Announcements", path: "/admin/announcements" },
    { name: "Settings", path: "/admin/settings" },
  ];

  return (
    <aside
      style={{
        width: "260px",
        background: "#166534",
        color: "#fff",
        minHeight: "100vh",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ marginBottom: "35px" }}>
        Gospel Revival Centre
      </h2>

      {menu.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          style={({ isActive }) => ({
            display: "block",
            padding: "12px 15px",
            marginBottom: "10px",
            textDecoration: "none",
            color: "#fff",
            borderRadius: "8px",
            background: isActive ? "#15803d" : "transparent",
          })}
        >
          {item.name}
        </NavLink>
      ))}
    </aside>
  );
}