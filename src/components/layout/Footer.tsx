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
          <h3 className="mb-4 text-xl font-bold">Quick Links</h3>

          <ul className="space-y-3 text-gray-400">
            <li className="cursor-pointer hover:text-orange-500">
              Marketplace
            </li>

            <li className="cursor-pointer hover:text-orange-500">
              Sell Item
            </li>

            <li className="cursor-pointer hover:text-orange-500">
              Login
            </li>

            <li className="cursor-pointer hover:text-orange-500">
              Register
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 text-xl font-bold">
            Contact
          </h3>

          <div className="space-y-4 text-gray-400">
            <div className="flex items-center gap-3">
              <Mail size={18} />
              <span>support@tigulenawo.com</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} />
              <span>+265 984 554 270</span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin size={18} />
              <span>Lilongwe, Malawi</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-700 py-6 text-center text-sm text-gray-500">
        © 2026 Tigule Nawo. Built with ❤️ for students in Malawi 🇲🇼
      </div>
    </footer>
  );
}