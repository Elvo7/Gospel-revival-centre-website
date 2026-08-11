import { useEffect, useState } from "react";

export default function SermonForm({
  open,
  onClose,
  onSave,
  initialData = null,
}) {
  const emptyForm = {
    title: "",
    preacher: "",
    scripture: "",
    description: "",
    sermon_date: "",
    youtube_url: "",
    audio_url: "",
    video_url: "",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...emptyForm,
        ...initialData,
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      return alert("Title is required");
    }

    if (!form.preacher.trim()) {
      return alert("Preacher is required");
    }

    onSave(form);
  };

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          width: "700px",
          maxWidth: "95%",
          background: "#fff",
          borderRadius: 12,
          padding: 30,
        }}
      >
        <h2 style={{ marginBottom: 20 }}>
          {initialData ? "Edit Sermon" : "Add Sermon"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="preacher"
            placeholder="Preacher"
            value={form.preacher}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="scripture"
            placeholder="Scripture"
            value={form.scripture}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="date"
            name="sermon_date"
            value={form.sermon_date}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="youtube_url"
            placeholder="YouTube URL"
            value={form.youtube_url}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="audio_url"
            placeholder="Audio URL"
            value={form.audio_url}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="video_url"
            placeholder="Video URL"
            value={form.video_url}
            onChange={handleChange}
            style={styles.input}
          />

          <textarea
            rows="5"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            style={{
              ...styles.input,
              resize: "vertical",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
              marginTop: 20,
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={styles.cancel}
            >
              Cancel
            </button>

            <button
              type="submit"
              style={styles.save}
            >
              {initialData ? "Update Sermon" : "Save Sermon"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    border: "1px solid #ddd",
    boxSizing: "border-box",
  },

  save: {
    background: "#166534",
    color: "#fff",
    border: "none",
    padding: "12px 25px",
    borderRadius: 8,
    cursor: "pointer",
  },

  cancel: {
    background: "#ddd",
    border: "none",
    padding: "12px 25px",
    borderRadius: 8,
    cursor: "pointer",
  },
};