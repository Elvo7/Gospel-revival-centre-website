function PastorWelcome() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        <div className="flex justify-center">
          <div className="w-72 h-80 rounded-2xl bg-green-200 flex items-center justify-center shadow-lg">
            <span className="text-green-800 text-lg font-semibold">
              Pastor's Photo
            </span>
          </div>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-green-700 mb-6">
            A Welcome from Our Pastor
          </h2>

          <p className="text-gray-700 leading-8 mb-6">
            Welcome to Gospel Revival Centre Kangemi. We are delighted that you
            have visited our website. Our prayer is that you will experience
            God's love, grow in faith, and find a place where you belong.
          </p>

          <blockquote className="border-l-4 border-green-700 pl-4 italic text-gray-600">
            "Come to me, all who labour and are heavy laden, and I will give
            you rest." — Matthew 11:28
          </blockquote>

          <button className="mt-8 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition">
            Read More
          </button>
        </div>

      </div>
    </section>
  );
}

export default PastorWelcome;