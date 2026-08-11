function EventsPreview() {
  const events = [
    {
      date: "03",
      month: "AUG",
      title: "Sunday Worship Celebration",
      description:
        "Join us for a powerful worship experience and the preaching of God's Word.",
    },
    {
      date: "10",
      month: "AUG",
      title: "Youth Fellowship",
      description:
        "A special evening of worship, teaching, games and fellowship for young people.",
    },
    {
      date: "17",
      month: "AUG",
      title: "Community Outreach",
      description:
        "Sharing God's love through evangelism and serving our local community.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-700">
            Upcoming Events
          </h2>

          <p className="mt-4 text-gray-600">
            Stay updated with what's happening at Gospel Revival Centre.
          </p>
        </div>

        {/* Events */}
        <div className="grid gap-8 md:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.title}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-xl transition duration-300 border border-gray-100"
            >
              {/* Date */}
              <div className="bg-green-700 text-white text-center py-8">
                <h3 className="text-5xl font-bold">
                  {event.date}
                </h3>

                <p className="mt-1 text-lg tracking-[4px]">
                  {event.month}
                </p>
              </div>

              {/* Event Information */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-green-700">
                  {event.title}
                </h3>

                <p className="mt-4 text-gray-600 leading-7">
                  {event.description}
                </p>

                <button
                  type="button"
                  className="mt-6 bg-red-600 text-white px-5 py-3 rounded-lg hover:bg-red-700 transition"
                >
                  Learn More
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
            View All Events
          </button>
        </div>

      </div>
    </section>
  );
}

export default EventsPreview;