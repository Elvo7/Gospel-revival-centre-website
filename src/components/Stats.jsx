function Stats() {
  const stats = [
    { number: "150+", title: "Members" },
    { number: "20+", title: "Years of Ministry" },
    { number: "35+", title: "Weekly Volunteers" },
    { number: "1000+", title: "Lives Touched" },
  ];

  return (
    <section className="bg-green-700 text-white py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 text-center">
        {stats.map((stat) => (
          <div key={stat.title}>
            <h2 className="text-5xl font-bold">{stat.number}</h2>
            <p className="mt-3">{stat.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;