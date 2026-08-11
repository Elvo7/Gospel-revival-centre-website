import useChurchSettings from "../hooks/useChurchSettings";

function ContactPreview() {
  const { settings, loading } = useChurchSettings();

  const address =
    settings?.address?.trim() || "Kangemi, Nairobi, Kenya";

  const phone =
    settings?.phone?.trim() || "+254 740955883";

  const email =
    settings?.email?.trim() || "info@gospelrevivalcentre.org";

  const sundayService =
    settings?.sunday_service?.trim() || "Sunday: 8:00 AM";

  const midweekService =
    settings?.midweek_service?.trim() ||
    "Wednesday Prayer: 5:30 PM";

  const prayerService =
    settings?.prayer_service?.trim() ||
    "Friday Bible Study: 6:00 PM";

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-green-700">
            Contact Us
          </h2>

          <p className="mt-3 text-gray-600">
            We'd love to worship with you.
          </p>
        </div>

        {/* Contact + Map */}
        <div className="grid lg:grid-cols-2 gap-10">

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="space-y-6">

              {/* Address */}
              <div>
                <h4 className="font-bold text-green-700">
                  Address
                </h4>

                <p className="mt-1 text-gray-700">
                  {loading ? "Loading..." : address}
                </p>
              </div>

              {/* Phone */}
              <div>
                <h4 className="font-bold text-green-700">
                  Phone
                </h4>

                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="mt-1 inline-block text-gray-700 hover:text-green-700 transition"
                >
                  {loading ? "Loading..." : phone}
                </a>
              </div>

              {/* Email */}
              <div>
                <h4 className="font-bold text-green-700">
                  Email
                </h4>

                <a
                  href={`mailto:${email}`}
                  className="mt-1 inline-block text-gray-700 hover:text-green-700 transition"
                >
                  {loading ? "Loading..." : email}
                </a>
              </div>

              {/* Service Times */}
              <div>
                <h4 className="font-bold text-green-700">
                  Service Times
                </h4>

                <div className="mt-2 space-y-1 text-gray-700">
                  <p>
                    {loading ? "Loading..." : sundayService}
                  </p>

                  <p>
                    {loading ? "Loading..." : midweekService}
                  </p>

                  <p>
                    {loading ? "Loading..." : prayerService}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Google Map */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <iframe
              title="Gospel Revival Centre Kangemi Map"
              src="https://www.google.com/maps?q=Kangemi,Nairobi&output=embed"
              width="100%"
              height="450"
              loading="lazy"
              style={{ border: 0 }}
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>

      </div>
    </section>
  );
}

export default ContactPreview;