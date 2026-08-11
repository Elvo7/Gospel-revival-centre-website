import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

const API_URL = "http://localhost:5000/api/settings/public";

function Footer() {
  const [settings, setSettings] = useState({
    church_name: "Gospel Revival Centre",
    church_tagline:
      "Transforming Lives Through the Gospel of Jesus Christ.",
    address: "Kangemi, Nairobi",
    phone: "+254 740955883",
    email: "info@gospelrevivalcentre.org",
    sunday_service: "Sunday Service",
    midweek_service: "Prayer Meeting",
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
        console.error("Failed to load footer settings:", error);
      }
    };

    loadSettings();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-300">

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

        <div>

          <img
            src={logo}
            alt={`${settings.church_name} Logo`}
            className="h-20 w-20 rounded-full mb-4"
          />

          <h2 className="text-2xl font-bold text-white">
            {settings.church_name}
          </h2>

          <p className="mt-4">
            {settings.church_tagline}
          </p>

        </div>

        <div>

          <h3 className="text-xl font-semibold text-white mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2">
            <li>Home</li>
            <li>About</li>
            <li>Ministries</li>
            <li>Contact</li>
          </ul>

        </div>

        <div>

          <h3 className="text-xl font-semibold text-white mb-4">
            Worship
          </h3>

          <ul className="space-y-2">
            <li>{settings.sunday_service || "Sunday Service"}</li>
            <li>{settings.prayer_service || "Prayer Meeting"}</li>
            <li>
              {settings.midweek_service || "Bible Study"}
            </li>
            <li>Youth Fellowship</li>
          </ul>

        </div>

        <div>

          <h3 className="text-xl font-semibold text-white mb-4">
            Contact
          </h3>

          <p>{settings.address || "Kangemi, Nairobi"}</p>
          <p>{settings.phone || "+254 740955883"}</p>
          <p>{settings.email || "info@gospelrevivalcentre.org"}</p>

        </div>

      </div>

      <div className="border-t border-gray-700 py-6 text-center">

        <p>
          © {new Date().getFullYear()}{" "}
          {settings.church_name} Kangemi.
          All Rights Reserved.
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Designed & Developed by Elvo Tech
        </p>

      </div>

    </footer>
  );
}

export default Footer;