import { useEffect, useState } from "react";
import api from "../services/api";

function EventsPreview() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events");

        const data = response.data;

        const eventList = Array.isArray(data)
          ? data
          : Array.isArray(data?.events)
          ? data.events
          : Array.isArray(data?.data)
          ? data.data
          : [];

        setEvents(eventList.slice(0, 3));
      } catch (error) {
        console.error("Failed to load events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (event) => {
    const rawDate =
      event.date ||
      event.event_date ||
      event.start_date ||
      event.created_at;

    if (!rawDate) {
      return {
        day: "--",
        month: "---",
      };
    }

    const date = new Date(rawDate);

    if (Number.isNaN(date.getTime())) {
      return {
        day: "--",
        month: "---",
      };
    }

    return {
      day: date.toLocaleDateString("en-GB", {
        day: "2-digit",
      }),
      month: date
        .toLocaleDateString("en-GB", {
          month: "short",
        })
        .toUpperCase(),
    };
  };

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

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              Loading events...
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && events.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-xl shadow">
            <p className="text-gray-600">
              No upcoming events available at the moment.
            </p>
          </div>
        )}

        {/* Events */}
        {!loading && events.length > 0 && (
          <div className="grid gap-8 md:grid-cols-3">
            {events.map((event) => {
              const { day, month } = formatDate(event);

              return (
                <div
                  key={event.id || event.title}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-xl transition duration-300 border border-gray-100"
                >

                  {/* Date */}
                  <div className="bg-green-700 text-white text-center py-8">
                    <h3 className="text-5xl font-bold">
                      {day}
                    </h3>

                    <p className="mt-1 text-lg tracking-[4px]">
                      {month}
                    </p>
                  </div>

                  {/* Event Information */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-green-700">
                      {event.title || "Church Event"}
                    </h3>

                    <p className="mt-4 text-gray-600 leading-7">
                      {event.description ||
                        "Join us for fellowship, worship and the Word of God."}
                    </p>

                    <button
                      type="button"
                      className="mt-6 bg-red-600 text-white px-5 py-3 rounded-lg hover:bg-red-700 transition"
                    >
                      Learn More
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* View All */}
        {!loading && events.length > 0 && (
          <div className="text-center mt-12">
            <button
              type="button"
              className="border-2 border-green-700 text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-700 hover:text-white transition"
            >
              View All Events
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

export default EventsPreview;