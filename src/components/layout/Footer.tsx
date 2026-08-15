import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 bg-slate-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3">
        {/* Logo */}
        <div>
          <h2 className="text-3xl font-black text-orange-500">
            🛒 Tigule Nawo
          </h2>

          <p className="mt-4 leading-7 text-gray-400">
            Malawi's student marketplace.
            <br />
            Buy. Sell. Save.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 text-xl font-bold">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-400">
            <li>
              <Link
                to="/marketplace"
                className="cursor-pointer hover:text-orange-500"
              >
                Marketplace
              </Link>
            </li>

            <li>
              <Link
                to="/sell"
                className="cursor-pointer hover:text-orange-500"
              >
                Sell Item
              </Link>
            </li>

            <li>
              <Link
                to="/login"
                className="cursor-pointer hover:text-orange-500"
              >
                Login
              </Link>
            </li>

            <li>
              <Link
                to="/register"
                className="cursor-pointer hover:text-orange-500"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 text-xl font-bold">
            Contact
          </h3>

          <div className="space-y-4 text-gray-400">
            {/* Email */}
            <a
              href="mailto:support@tigulenawo.com"
              className="flex items-center gap-3 hover:text-orange-500"
            >
              <Mail size={18} />
              <span>support@tigulenawo.com</span>
            </a>

            {/* Phone */}
            <a
              href="tel:+265984554270"
              className="flex items-center gap-3 hover:text-orange-500"
            >
              <Phone size={18} />
              <span>+265 984 554 270</span>
            </a>

            {/* Location */}
            <div className="flex items-center gap-3">
              <MapPin size={18} />
              <span>Lilongwe, Malawi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-700 py-6 text-center text-sm text-gray-500">
        © 2026 Tigule Nawo. Built with ❤️ for students in Malawi 🇲🇼
      </div>
    </footer>
  );
}