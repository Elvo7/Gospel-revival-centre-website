function GalleryPreview() {
  const images = [
    "/gallery1.jpg",
    "/gallery2.jpg",
    "/gallery3.jpg",
    "/gallery4.jpg",
    "/gallery5.jpg",
    "/gallery6.jpg",
  ];

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

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div
              key={image}
              className="group overflow-hidden rounded-xl shadow-lg bg-white"
            >
              <img
                src={image}
                alt={`Gospel Revival Centre gallery ${index + 1}`}
                className="w-full h-72 object-cover transition duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* View Gallery */}
        <div className="text-center mt-12">
          <button
            type="button"
            className="border-2 border-green-700 text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-700 hover:text-white transition"
          >
            View Full Gallery
          </button>
        </div>

      </div>
    </section>
  );
}

export default GalleryPreview;