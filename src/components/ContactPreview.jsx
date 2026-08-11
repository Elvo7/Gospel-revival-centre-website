import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/settings/public";

function ContactPreview() {
  const [settings, setSettings] = useState({
    address: "Kangemi, Nairobi, Kenya",
    phone: "+254 740955883",
    email: "info@gospelrevivalcentre.org",
    sunday_service: "Sunday: 8:00 AM",
    midweek_service: "Wednesday Prayer: 5:30 PM",
    prayer_service: "Friday Bible Study: 6:00 PM",
  });

  useEffect(() => {
    let mounted = true;

    const loadSettings = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        if (mounted && data.success && data.settings) {
          setSettings((current) => ({
            ...current,
            ...data.settings,
          }));
        }
      } catch (error) {
        console.error("Failed to load contact settings:", error);
      }
    };

    loadSettings();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-green-700">
            Contact Us
          </h2>

          <p className="mt-3 text-gray-600">
            We'd love to worship with you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          <div className="bg-white rounded-xl shadow-lg p-8">

            <div className="space-y-6">

              <div>
                <h4 className="font-bold text-green-700">
                  📍 Address
                </h4>

                <p>
                  {settings.address || "Kangemi, Nairobi, Kenya"}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-green-700">
                  ☎ Phone
                </h4>

                <a
                  href={`tel:${settings.phone || "+254740955883"}`}
                  className="hover:text-green-700"
                >
                  {settings.phone || "+254 740955883"}
                </a>
              </div>

              <div>
                <h4 className="font-bold text-green-700">
                  ✉ Email
                </h4>

                <a
                  href={`mailto:${
                    settings.email || "info@gospelrevivalcentre.org"
                  }`}
                  className="hover:text-green-700"
                >
                  {settings.email || "info@gospelrevivalcentre.org"}
                </a>
              </div>

              <div>
                <h4 className="font-bold text-green-700">
                  🕘 Service Times
                </h4>

                <p>
                  {settings.sunday_service || "Sunday: 8:00 AM"}
                </p>

                <p>
                  {settings.midweek_service ||
                    "Wednesday Prayer: 5:30 PM"}
                </p>

                <p>
                  {settings.prayer_service ||
                    "Friday Bible Study: 6:00 PM"}
                </p>
              </div>

            </div>

          </div>

          <div className="rounded-xl overflow-hidden shadow-lg">

            <iframe
              title="Church Map"
              src="https://www.google.com/maps?q=Kangemi,Nairobi&output=embed"
              width="100%"
              height="450"
              loading="lazy"
            ></iframe>

          </div>

        </div>

      </div>
    </section>
  );
}

export default ContactPreview;