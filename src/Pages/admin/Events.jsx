import { useEffect, useState } from "react";
import Layout from "../../components/admin/Layout";
import {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from "../../services/api";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    venue: "",
    event_date: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.title || !form.venue || !form.event_date) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      if (editingId) {
        await updateEvent(editingId, form);
      } else {
        await addEvent(form);
      }

      setForm({
        title: "",
        description: "",
        venue: "",
        event_date: "",
      });

      setEditingId(null);
      loadEvents();
    } catch (err) {
      alert(err.message);
    }
  }

  function editEvent(event) {
    setEditingId(event.id);
    setForm(event);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function removeEvent(id) {
    if (!window.confirm("Delete this event?")) return;

    await deleteEvent(id);
    loadEvents();
  }

  const filtered = events.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.venue.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <h1>Events</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 10,
          marginBottom: 25,
        }}
      >
        <h3>{editingId ? "Edit Event" : "Add Event"}</h3>

        <input
          placeholder="Event Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          style={input}
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          style={input}
        />

        <input
          placeholder="Venue"
          value={form.venue}
          onChange={(e) =>
            setForm({ ...form, venue: e.target.value })
          }
          style={input}
        />

        <input
          type="date"
          value={form.event_date}
          onChange={(e) =>
            setForm({ ...form, event_date: e.target.value })
          }
          style={input}
        />

        <button className="primary-btn">
          {editingId ? "Update Event" : "Add Event"}
        </button>
      </form>

      <input
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
        }}
      />

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Venue</th>
            <th>Date</th>
            <th width="180">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((event) => (
            <tr key={event.id}>
              <td>{event.title}</td>
              <td>{event.venue}</td>
              <td>{event.event_date}</td>

              <td>
                <button
                  onClick={() => editEvent(event)}
                  style={editBtn}
                >
                  Edit
                </button>

                <button
                  onClick={() => removeEvent(event.id)}
                  style={deleteBtn}
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