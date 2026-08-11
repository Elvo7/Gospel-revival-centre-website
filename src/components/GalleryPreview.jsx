import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/gallery";

function GalleryPreview() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchGallery = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        if (mounted) {
          if (data.success) {
            setGallery(data.gallery || []);
          } else {
            setError("Unable to load gallery.");
          }
        }
      } catch (err) {
        console.error("Failed to load gallery:", err);

        if (mounted) {
          setError("Unable to load gallery.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchGallery();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-700">
            Church Gallery
          </h2>

          <p className="mt-4 text-gray-600">
            Moments of worship, fellowship and outreach.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              Loading gallery...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-12">
            <p className="text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* Empty Gallery */}
        {!loading && !error && gallery.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              No gallery images available yet.
            </p>
          </div>
        )}

        {/* Gallery */}
        {!loading && !error && gallery.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {gallery.slice(0, 6).map((image) => (
              <div
                key={image.id}
                className="group overflow-hidden rounded-xl shadow-lg bg-white"
              >
                <img
                  src={image.image_url}
                  alt={
                    image.title ||
                    "Gospel Revival Centre gallery"
                  }
                  className="w-full h-72 object-cover transition duration-500 group-hover:scale-110"
                  loading="lazy"
                />

                {(image.title || image.description) && (
                  <div className="p-5">
                    {image.title && (
                      <h3 className="text-xl font-bold text-green-700">
                        {image.title}
                      </h3>
                    )}

                    {image.description && (
                      <p className="mt-2 text-gray-600">
                        {image.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}

          </div>
        )}

        {/* View Gallery */}
        {!loading && gallery.length > 0 && (
          <div className="text-center mt-12">
            <button
              type="button"
              className="border-2 border-green-700 text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-700 hover:text-white transition"
            >
              View Full Gallery
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

export default GalleryPreview;