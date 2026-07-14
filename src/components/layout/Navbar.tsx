import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 shadow-sm backdrop-blur">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        <Link
          to="/"
          className="text-3xl font-black text-orange-500"
        >
          Tigule Nawo
        </Link>

        <nav className="flex items-center gap-8 font-medium">

          <Link to="/">Home</Link>

          <Link to="/">Marketplace</Link>

          <Link to="/">Categories</Link>

          <Link to="/">Sell</Link>

          <button className="rounded-lg bg-orange-500 px-5 py-2 text-white">

            Login

          </button>

        </nav>

      </div>

    </header>
  );
}