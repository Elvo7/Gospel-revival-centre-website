import { useEffect, useState } from "react";
import {
  getSermons,
  addSermon,
  updateSermon,
  deleteSermon,
} from "../../services/api";
import SermonForm from "../../components/admin/SermonForm";

export default function Sermons() {
  const [sermons, setSermons] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedSermon, setSelectedSermon] = useState(null);

  useEffect(() => {
    loadSermons();
  }, []);

  const loadSermons = async () => {
    try {
      const data = await getSermons();
      setSermons(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (form) => {
    try {
      if (selectedSermon) {
        await updateSermon(selectedSermon.id, form);
      } else {
        await addSermon(form);
      }

      setShowForm(false);
      setSelectedSermon(null);

      loadSermons();
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.error ||
          err.response?.data?.message ||
          err.message
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this sermon?")) return;

    try {
      await deleteSermon(id);
      loadSermons();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Sermons</h1>

      <button
        onClick={() => {
          setSelectedSermon(null);
          setShowForm(true);
        }}
      >
        Add Sermon
      </button>

      <table
        border="1"
        cellPadding="10"
        style={{
          marginTop: 20,
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Title</th>
            <th>Preacher</th>
            <th>Scripture</th>
            <th>Date</th>
            <th>YouTube</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {sermons.map((sermon) => (
            <tr key={sermon.id}>
              <td>{sermon.title}</td>
              <td>{sermon.preacher}</td>
              <td>{sermon.scripture}</td>
              <td>{sermon.sermon_date}</td>
              <td>
                {sermon.youtube_url && (
                  <a
                    href={sermon.youtube_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Watch
                  </a>
                )}
              </td>
              <td>
                <button
                  onClick={() => {
                    setSelectedSermon(sermon);
                    setShowForm(true);
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(sermon.id)}
                  style={{ marginLeft: 10 }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <SermonForm
        open={showForm}
        initialData={selectedSermon}
        onClose={() => {
          setShowForm(false);
          setSelectedSermon(null);
        }}
        onSave={handleSave}
      />
    </div>
  );
}