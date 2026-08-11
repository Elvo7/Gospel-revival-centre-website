import { useEffect, useState } from "react";
import api from "../services/api";

function GalleryPreview() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await api.get("/gallery");

        const data = response.data;

        const galleryList = Array.isArray(data)
          ? data
          : Array.isArray(data?.gallery)
          ? data.gallery
          : Array.isArray(data?.images)
          ? data.images
          : Array.isArray(data?.data)
          ? data.data
          : [];

        setImages(galleryList.slice(0, 6));
      } catch (error) {
        console.error("Failed to load gallery:", error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const getImageUrl = (image) => {
    if (typeof image === "string") {
      return image;
    }

    return (
      image?.image_url ||
      image?.image ||
      image?.url ||
      image?.imageUrl ||
      ""
    );
  };

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

        {/* Empty State */}
        {!loading && images.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <p className="text-gray-600">
              No gallery images available at the moment.
            </p>
          </div>
        )}

        {/* Gallery */}
        {!loading && images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image, index) => {
              const imageUrl = getImageUrl(image);

              return (
                <div
                  key={image?.id || imageUrl || index}
                  className="group overflow-hidden rounded-xl shadow-lg bg-white"
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={
                        image?.title ||
                        `Gospel Revival Centre gallery ${index + 1}`
                      }
                      className="w-full h-72 object-cover transition duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-72 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">
                        Image unavailable
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* View Gallery */}
        {!loading && images.length > 0 && (
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