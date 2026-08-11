import { useEffect, useState } from "react";
import Layout from "../../components/admin/Layout";
import {
  getMembers,
  addMember,
  updateMember,
  deleteMember,
} from "../../services/api";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadMembers();
  }, []);

  async function loadMembers() {
    try {
      const data = await getMembers();
      setMembers(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.full_name.trim() ||
      !form.email.trim() ||
      !form.phone.trim()
    ) {
      alert("Fill in all fields.");
      return;
    }

    try {
      if (editingId) {
        await updateMember(editingId, form);
      } else {
        await addMember(form);
      }

      setForm({
        full_name: "",
        email: "",
        phone: "",
      });

      setEditingId(null);

      loadMembers();
    } catch (err) {
      alert(err.message);
    }
  }

  function editMember(member) {
    setEditingId(member.id);

    setForm({
      full_name: member.full_name,
      email: member.email,
      phone: member.phone,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function removeMember(id) {
    if (!window.confirm("Delete this member?")) return;

    await deleteMember(id);

    loadMembers();
  }

  const filtered = members.filter(
    (m) =>
      m.full_name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <h1>Members</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "20px",
          marginBottom: "30px",
        }}
      >
        <h3>{editingId ? "Edit Member" : "Add Member"}</h3>

        <input
          placeholder="Full Name"
          value={form.full_name}
          onChange={(e) =>
            setForm({ ...form, full_name: e.target.value })
          }
          style={input}
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          style={input}
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
          style={input}
        />

        <button className="primary-btn">
          {editingId ? "Update Member" : "Add Member"}
        </button>
      </form>

      <input
        placeholder="Search member..."
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
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th width="180">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((member) => (
            <tr key={member.id}>
              <td>{member.full_name}</td>
              <td>{member.email}</td>
              <td>{member.phone}</td>

              <td>
                <button
                  onClick={() => editMember(member)}
                  style={editBtn}
                >
                  Edit
                </button>

                <button
                  onClick={() => removeMember(member.id)}
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