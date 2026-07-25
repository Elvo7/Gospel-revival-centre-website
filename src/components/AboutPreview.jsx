function AboutPreview() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h2 className="text-4xl font-bold text-green-700 mb-6">
            About Our Church
          </h2>

          <p className="text-gray-700 leading-8">
            Gospel Revival Centre Kangemi is a Bible-believing church committed
            to preaching the Gospel of Jesus Christ, nurturing believers,
            empowering families, and transforming communities through God's
            love.
          </p>

          <button className="mt-8 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition">
            Learn More
          </button>
        </div>

        <div className="bg-green-100 rounded-2xl p-10 shadow-lg">
          <h3 className="text-2xl font-bold text-green-800 mb-4">
            Our Mission
          </h3>

          <p className="text-gray-700">
            To make disciples, proclaim the Gospel, and impact lives through
            worship, prayer, biblical teaching, and community outreach.
          </p>
        </div>

      </div>
    </section>
  );
}

export default AboutPreview;