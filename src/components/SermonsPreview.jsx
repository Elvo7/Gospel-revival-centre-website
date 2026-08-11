import { useEffect, useState } from "react";
import api from "../services/api";

function SermonsPreview() {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSermons = async () => {
      try {
        const response = await api.get("/sermons");

        const data = response.data;

        const sermonList = Array.isArray(data)
          ? data
          : Array.isArray(data?.sermons)
          ? data.sermons
          : Array.isArray(data?.data)
          ? data.data
          : [];

        setSermons(sermonList.slice(0, 3));
      } catch (error) {
        console.error("Failed to load sermons:", error);
        setSermons([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSermons();
  }, []);

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

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              Loading sermons...
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && sermons.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <p className="text-gray-600">
              No sermons available at the moment.
            </p>
          </div>
        )}

        {/* Sermons */}
        {!loading && sermons.length > 0 && (
          <div className="grid gap-8 md:grid-cols-3">
            {sermons.map((sermon) => (
              <div
                key={sermon.id || sermon.title}
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
                    {sermon.title || "Untitled Sermon"}
                  </h3>

                  <p className="mt-3 text-gray-600">
                    {sermon.preacher ||
                      sermon.preacher_name ||
                      "Gospel Revival Centre"}
                  </p>

                  <p className="mt-2 text-red-600 font-medium">
                    {sermon.date
                      ? new Date(sermon.date).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )
                      : sermon.created_at
                      ? new Date(
                          sermon.created_at
                        ).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : ""}
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
        )}

        {/* View All */}
        {!loading && sermons.length > 0 && (
          <div className="text-center mt-12">
            <button
              type="button"
              className="border-2 border-green-700 text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-700 hover:text-white transition"
            >
              View All Sermons
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

export default SermonsPreview;