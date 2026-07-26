function GivePreview() {
  return (
    <section className="bg-gradient-to-r from-green-700 to-green-900 text-white py-20">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold">
            Give to the Ministry
          </h2>

          <p className="mt-4 text-lg text-green-100">
            Your generosity helps us spread the Gospel, support outreach,
            and serve our community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* M-Pesa Card */}
          <div className="bg-white text-gray-800 rounded-2xl shadow-xl p-8">

            <h3 className="text-3xl font-bold text-green-700 mb-6">
              📱 M-Pesa Giving
            </h3>

            <div className="space-y-4 text-lg">
              <p>
                <strong>Paybill:</strong> 123456
              </p>

              <p>
                <strong>Account:</strong> TITHE / OFFERING
              </p>

              <p>
                <strong>Name:</strong> Gospel Revival Centre
              </p>
            </div>

            <button className="mt-8 w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition">
              Give via M-Pesa
            </button>

          </div>

          {/* Scripture Card */}
          <div className="bg-red-600 rounded-2xl shadow-xl p-8 flex flex-col justify-center">

            <h3 className="text-3xl font-bold mb-6">
              "God Loves a Cheerful Giver"
            </h3>

            <p className="text-lg leading-8">
              Each one must give as he has decided in his heart,
              not reluctantly or under compulsion,
              for God loves a cheerful giver.
            </p>

            <p className="mt-6 font-semibold">
              — 2 Corinthians 9:7
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

export default GivePreview;