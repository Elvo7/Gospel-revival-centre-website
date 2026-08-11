function SermonsPreview() {
  const sermons = [
    {
      title: "Walking by Faith",
      preacher: "Rev. John Doe",
      date: "20 July 2026",
    },
    {
      title: "The Power of Prayer",
      preacher: "Rev. John Doe",
      date: "13 July 2026",
    },
    {
      title: "Living in God's Grace",
      preacher: "Rev. John Doe",
      date: "6 July 2026",
    },
  ];

  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-700">
            Latest Sermons
          </h2>

          <p className="mt-3 text-gray-600">
            Watch and listen to recent messages from our church.
          </p>
        </div>

        {/* Sermons */}
        <div className="grid gap-8 md:grid-cols-3">
          {sermons.map((sermon) => (
            <div
              key={sermon.title}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
            >
              {/* Video Preview */}
              <div className="bg-black h-52 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-green-700 flex items-center justify-center text-white text-2xl">
                  ▶
                </div>
              </div>

              {/* Sermon Information */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-green-700">
                  {sermon.title}
                </h3>

                <p className="mt-3 text-gray-600">
                  {sermon.preacher}
                </p>

                <p className="mt-2 text-red-600 font-medium">
                  {sermon.date}
                </p>

                <button
                  type="button"
                  className="mt-6 bg-green-700 text-white px-5 py-3 rounded-lg hover:bg-green-800 transition"
                >
                  Watch Sermon
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <button
            type="button"
            className="border-2 border-green-700 text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-700 hover:text-white transition"
          >
            View All Sermons
          </button>
        </div>

      </div>
    </section>
  );
}

export default SermonsPreview;