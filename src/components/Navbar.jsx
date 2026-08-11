import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

const API_URL = "http://localhost:5000/api/settings/public";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [settings, setSettings] = useState({
    church_name: "Gospel Revival Centre",
    address: "Kangemi",
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
        console.error("Failed to load navbar settings:", error);
      }
    };

    loadSettings();

    return () => {
      mounted = false;
    };
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Service", path: "/service" },
    { name: "Ministries", path: "/ministries" },
    { name: "Sermons", path: "/sermons" },
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "Give", path: "/give" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt={`${settings.church_name} Logo`}
            className="w-14 h-14 rounded-full"
          />

          <div>
            <h2 className="font-bold text-green-700 text-lg">
              {settings.church_name}
            </h2>

            <p className="text-red-600 text-sm">
              {settings.address || "Kangemi"}
            </p>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-8 font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-green-700 font-bold"
                    : "hover:text-green-700 transition"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden"
        >
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <ul className="flex flex-col text-center py-4">
            {navItems.map((item) => (
              <li key={item.name} className="py-3 border-b">
                <NavLink
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-green-700 font-bold"
                      : "hover:text-green-700"
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;