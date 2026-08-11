import { useEffect, useState } from "react";
import GalleryForm from "../../components/admin/GalleryForm";
import {
  getGallery,
  deleteGalleryImage,
} from "../../services/api";

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGallery();
  }, []);

  async function loadGallery() {
    try {
      setLoading(true);
      const data = await getGallery();
      setGallery(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this image?")) return;

    try {
      await deleteGalleryImage(id);
      loadGallery();
    } catch (err) {
      console.error(err);
      alert("Failed to delete image.");
    }
  }

  return (
    <div style={{ padding: 30 }}>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <div>
          <h1>Gallery</h1>
          <p>Manage church gallery images.</p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          style={{
            background: "#166534",
            color: "#fff",
            border: "none",
            padding: "12px 20px",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          + Upload Image
        </button>
      </div>

      {loading ? (
        <h3>Loading...</h3>
      ) : gallery.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: 80,
            background: "#fff",
            borderRadius: 12,
          }}
        >
          <h2>No Images Found</h2>
          <p>Upload your first church photo.</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
            gap: 25,
          }}
        >
          {gallery.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#fff",
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 5px 12px rgba(0,0,0,.1)",
              }}
            >
              <img
                src={item.image_url}
                alt={item.title}
                style={{
                  width: "100%",
                  height: 220,
                  objectFit: "cover",
                }}
              />

              <div style={{ padding: 20 }}>
                <h3>{item.title}</h3>

                <p>{item.description}</p>

                <button
                  onClick={() => handleDelete(item.id)}
                  style={{
                    background: "#dc2626",
                    color: "#fff",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: 8,
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <GalleryForm
        open={showForm}
        onClose={() => setShowForm(false)}
        onSuccess={() => {
          setShowForm(false);
          loadGallery();
        }}
      />

    </div>
  );
}