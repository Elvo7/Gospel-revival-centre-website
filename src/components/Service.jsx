function Service() {
  const services = [
    {
      day: "Sunday Worship",
      time: "8:00 AM - 12:30 PM",
      description: "Praise, worship, prayer and the Word of God.",
    },
    {
      day: "Wednesday Prayer",
      time: "5:30 PM - 7:00 PM",
      description: "An evening of prayer and spiritual growth.",
    },
    {
      day: "Friday Bible Study",
      time: "6:00 PM - 7:30 PM",
      description: "Growing deeper in God's Word together.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-green-700 mb-4">
          Church Service
        </h2>

        <p className="text-center text-gray-600 mb-12">
          Join us as we worship, pray, and grow together.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.day}
              className="rounded-xl bg-green-50 border border-green-100 p-8 shadow hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-bold text-green-700">
                {service.day}
              </h3>

              <p className="mt-3 font-semibold text-red-600">
                {service.time}
              </p>

              <p className="mt-4 text-gray-700">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Service;