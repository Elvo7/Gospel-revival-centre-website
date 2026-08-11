import { useState } from "react";
import { uploadGalleryImage } from "../../services/api";

export default function GalleryForm({
  open,
  onClose,
  onSuccess,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !image) {
      alert("Please enter a title and choose an image.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);

      const newImage = await uploadGalleryImage(formData);

      onSuccess(newImage);

      setTitle("");
      setDescription("");
      setImage(null);
      setPreview("");

      onClose();
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.55)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          width: 500,
          background: "#fff",
          borderRadius: 12,
          padding: 25,
        }}
      >
        <h2>Add Gallery Image</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Image Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />

          <textarea
            placeholder="Description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.input}
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "100%",
                marginTop: 20,
                borderRadius: 8,
              }}
            />
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
              marginTop: 25,
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
              disabled={loading}
              style={styles.save}
            >
              {loading ? "Uploading..." : "Upload Image"}
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
    padding: "12px 20px",
    borderRadius: 8,
    cursor: "pointer",
  },

  cancel: {
    background: "#ddd",
    border: "none",
    padding: "12px 20px",
    borderRadius: 8,
    cursor: "pointer",
  },
};