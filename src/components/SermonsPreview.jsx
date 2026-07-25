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

        <h2 className="text-4xl font-bold text-center text-green-700 mb-4">
          Latest Sermons
        </h2>

        <p className="text-center text-gray-600 mb-12">
          Watch and listen to recent messages from our church.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {sermons.map((sermon) => (
            <div
              key={sermon.title}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
            >
              <div className="bg-black h-52 flex items-center justify-center text-white text-5xl">
                ▶
              </div>

              <div className="p-6">

                <h3 className="text-2xl font-bold text-green-700">
                  {sermon.title}
                </h3>

                <p className="mt-3 text-gray-600">
                  {sermon.preacher}
                </p>

                <p className="text-red-600 mt-2">
                  {sermon.date}
                </p>

                <button className="mt-6 bg-green-700 text-white px-5 py-3 rounded-lg hover:bg-green-800 transition">
                  Watch Sermon
                </button>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default SermonsPreview;