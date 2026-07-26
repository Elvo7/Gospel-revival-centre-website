import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

        <div>

          <img
            src={logo}
            alt="Church Logo"
            className="h-20 w-20 rounded-full mb-4"
          />

          <h2 className="text-2xl font-bold text-white">
            Gospel Revival Centre
          </h2>

          <p className="mt-4">
            Transforming Lives Through the Gospel of Jesus Christ.
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
            <li>Sunday Service</li>
            <li>Prayer Meeting</li>
            <li>Bible Study</li>
            <li>Youth Fellowship</li>
          </ul>

        </div>

        <div>

          <h3 className="text-xl font-semibold text-white mb-4">
            Contact
          </h3>

          <p>Kangemi, Nairobi</p>
          <p>+254 740955883</p>
          <p>info@gospelrevivalcentre.org</p>

        </div>

      </div>

      <div className="border-t border-gray-700 py-6 text-center">

        <p>
          © {new Date().getFullYear()} Gospel Revival Centre Kangemi.
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