function Ministries() {
  const ministries = [
    {
      title: "Youth Ministry",
      description: "Equipping young people to grow in Christ and serve others.",
      icon: "🌱",
    },
    {
      title: "Men's Ministry",
      description: "Building godly men through fellowship, prayer and leadership.",
      icon: "👨",
    },
    {
      title: "Women's Ministry",
      description: "Encouraging women to flourish in faith, family and service.",
      icon: "👩",
    },
    {
      title: "Children's Ministry",
      description: "Helping children know Jesus in a fun and safe environment.",
      icon: "🧒",
    },
  ];

  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-green-700 mb-4">
          Our Ministries
        </h2>

        <p className="text-center text-gray-600 mb-12">
          There is a place for everyone to grow, serve and belong.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {ministries.map((ministry) => (
            <div
              key={ministry.title}
              className="bg-white rounded-xl shadow-lg p-8 text-center hover:scale-105 transition"
            >
              <div className="text-5xl mb-4">{ministry.icon}</div>

              <h3 className="text-2xl font-semibold text-green-700 mb-3">
                {ministry.title}
              </h3>

              <p className="text-gray-600">
                {ministry.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Ministries;