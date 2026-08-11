import { useEffect, useState } from "react";
import Layout from "../../components/admin/Layout";
import {
  getAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../../services/api";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    title: "",
    message: "",
    priority: "Normal",
    status: "Published",
    pinned: false,
    expiry_date: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  async function loadAnnouncements() {
    try {
      const data = await getAnnouncements();
      setAnnouncements(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setAnnouncements([]);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.title.trim() || !form.message.trim()) {
      alert("Title and message are required.");
      return;
    }

    try {
      if (editingId) {
        await updateAnnouncement(editingId, form);
      } else {
        await addAnnouncement(form);
      }

      setForm({
        title: "",
        message: "",
        priority: "Normal",
        status: "Published",
        pinned: false,
        expiry_date: "",
      });

      setEditingId(null);

      loadAnnouncements();
    } catch (err) {
      alert(err.message);
    }
  }

  function editAnnouncement(item) {
    setEditingId(item.id);

    setForm({
      title: item.title || "",
      message: item.message || "",
      priority: item.priority || "Normal",
      status: item.status || "Published",
      pinned: item.pinned || false,
      expiry_date: item.expiry_date || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function removeAnnouncement(id) {
    if (!window.confirm("Delete this announcement?")) return;

    await deleteAnnouncement(id);

    loadAnnouncements();
  }

  const filtered = announcements.filter((a) => {
    const title = a.title || "";
    const message = a.message || "";

    return (
      title.toLowerCase().includes(search.toLowerCase()) ||
      message.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <Layout>
      <h1>Announcements</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 10,
          marginTop: 20,
          marginBottom: 30,
        }}
      >
        <h3>{editingId ? "Edit Announcement" : "Add Announcement"}</h3>

        <input
          style={input}
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <textarea
          style={{
            ...input,
            minHeight: 120,
            resize: "vertical",
          }}
          placeholder="Announcement..."
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
        />

        <select
          style={input}
          value={form.priority}
          onChange={(e) =>
            setForm({ ...form, priority: e.target.value })
          }
        >
          <option>Low</option>
          <option>Normal</option>
          <option>High</option>
        </select>

        <select
          style={input}
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option>Published</option>
          <option>Draft</option>
        </select>

        <label style={{ display: "block", marginBottom: 15 }}>
          <input
            type="checkbox"
            checked={form.pinned}
            onChange={(e) =>
              setForm({
                ...form,
                pinned: e.target.checked,
              })
            }
          />{" "}
          Pin Announcement
        </label>

        <input
          type="date"
          style={input}
          value={form.expiry_date}
          onChange={(e) =>
            setForm({
              ...form,
              expiry_date: e.target.value,
            })
          }
        />

        <button className="primary-btn">
          {editingId ? "Update Announcement" : "Add Announcement"}
        </button>
      </form>

      <input
        style={{
          width: "100%",
          padding: 12,
          marginBottom: 20,
        }}
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Pinned</th>
            <th>Expiry</th>
            <th width="180">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.priority}</td>
              <td>{item.status}</td>
              <td>{item.pinned ? "Yes" : "No"}</td>
              <td>{item.expiry_date || "-"}</td>

              <td>
                <button
                  style={editBtn}
                  onClick={() => editAnnouncement(item)}
                >
                  Edit
                </button>

                <button
                  style={deleteBtn}
                  onClick={() => removeAnnouncement(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "6px",
};

const editBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  marginRight: "10px",
  borderRadius: "5px",
  cursor: "pointer",
};

const deleteBtn = {
  background: "#dc2626",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  cursor: "pointer",
};