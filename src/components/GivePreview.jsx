function GivePreview() {
  return (
    <section className="bg-gradient-to-r from-green-700 to-green-900 text-white py-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold">
            Give to the Ministry
          </h2>

          <p className="mt-4 text-lg text-green-100 max-w-2xl mx-auto">
            Your generosity helps us spread the Gospel, support outreach,
            and serve our community.
          </p>
        </div>

        {/* Giving Options */}
        <div className="grid gap-10 md:grid-cols-2">

          {/* Equity Bank */}
          <div className="bg-white text-gray-800 rounded-2xl shadow-xl p-8">

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                E
              </div>

              <h3 className="text-3xl font-bold text-green-700">
                Equity Bank
              </h3>
            </div>

            <div className="space-y-4 text-lg">
              <p>
                <strong>Paybill No:</strong>{" "}
                <span className="font-bold text-green-700">
                  247247
                </span>
              </p>

              <p>
                <strong>Church A/C No:</strong>{" "}
                <span className="font-bold text-green-700">
                  883683
                </span>
              </p>

              <p className="text-gray-600">
                Use the Church A/C No. when prompted for the account number.
              </p>
            </div>

          </div>

          {/* M-Pesa */}
          <div className="bg-white text-gray-800 rounded-2xl shadow-xl p-8">

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                M
              </div>

              <h3 className="text-3xl font-bold text-green-700">
                M-Pesa Giving
              </h3>
            </div>

            <div className="space-y-4 text-lg">
              <p>
                <strong>Paybill No:</strong>{" "}
                <span className="font-bold text-green-700">
                  4020297
                </span>
              </p>

              <p>
                <strong>Church:</strong> Gospel Revival Centre
              </p>

              <p className="text-gray-600">
                Use the M-Pesa Paybill above to support the ministry.
              </p>
            </div>

          </div>

        </div>

        {/* Scripture */}
        <div className="mt-10 bg-red-600 rounded-2xl shadow-xl p-8 text-center">

          <h3 className="text-3xl font-bold mb-6">
            "God Loves a Cheerful Giver"
          </h3>

          <p className="text-lg leading-8 max-w-3xl mx-auto">
            Each one must give as he has decided in his heart,
            not reluctantly or under compulsion,
            for God loves a cheerful giver.
          </p>

          <p className="mt-6 font-semibold">
            — 2 Corinthians 9:7
          </p>

        </div>

      </div>
    </section>
  );
}

export default GivePreview;