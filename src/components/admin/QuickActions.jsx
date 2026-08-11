import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  const btn = {
    padding: "14px",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "15px",
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: 20,
        borderRadius: 12,
        boxShadow: "0 3px 10px rgba(0,0,0,.08)",
      }}
    >
      <h3>Quick Actions</h3>

      <div
        style={{
          display: "grid",
          gap: 15,
          marginTop: 20,
        }}
      >
        <button
          style={{ ...btn, background: "#16a34a" }}
          onClick={() => navigate("/admin/members")}
        >
          ➕ Add Member
        </button>

        <button
          style={{ ...btn, background: "#2563eb" }}
          onClick={() => navigate("/admin/events")}
        >
          📅 Add Event
        </button>

        <button
          style={{ ...btn, background: "#9333ea" }}
          onClick={() => navigate("/admin/sermons")}
        >
          🎤 Upload Sermon
        </button>

        <button
          style={{ ...btn, background: "#dc2626" }}
          onClick={() => navigate("/admin/gallery")}
        >
          🖼 Upload Gallery
        </button>
      </div>
    </div>
  );
}