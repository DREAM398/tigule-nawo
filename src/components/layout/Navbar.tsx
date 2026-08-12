import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";
import { getUnreadCount } from "../../services/messageService";

export default function Navbar() {
  const { session, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const user = session?.user;

  function closeMenu() {
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!user) {
      setUnreadCount(0);
      return;
    }

    loadUnreadCount();

    const channel = supabase
      .channel("navbar-unread")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
        },
        () => {
          loadUnreadCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  async function loadUnreadCount() {
    const count = await getUnreadCount();
    setUnreadCount(count);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6">

        {/* Logo */}
        <Link to="/" onClick={closeMenu}>
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 font-medium text-gray-700 lg:flex">

          <Link
            to="/"
            className="transition duration-300 hover:text-orange-500"
          >
            Home
          </Link>

          <Link
            to="/marketplace"
            className="transition duration-300 hover:text-orange-500"
          >
            Marketplace
          </Link>

          {user && (
            <>
              <Link
                to="/sell"
                className="transition duration-300 hover:text-orange-500"
              >
                Sell
              </Link>

              <Link
                to="/wishlist"
                className="transition duration-300 hover:text-orange-500"
              >
                Wishlist
              </Link>

              <Link
                to="/messages"
                className="relative transition duration-300 hover:text-orange-500"
              >
                Messages
                {unreadCount > 0 && (
                  <span className="absolute -right-3 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </Link>

              <Link
                to="/my-products"
                className="transition duration-300 hover:text-orange-500"
              >
                My Products
              </Link>

              <Link
                to="/profile"
                className="transition duration-300 hover:text-orange-500"
              >
                Profile
              </Link>
            </>
          )}

          {user ? (
            <div className="flex items-center gap-4">

              <span className="font-semibold text-orange-600">
                {user.email}
              </span>

              <button
                onClick={logout}
                className="rounded-xl bg-red-500 px-5 py-2 font-semibold text-white transition duration-300 hover:bg-red-600"
              >
                Logout
              </button>

            </div>
          ) : (
            <div className="flex items-center gap-3">

              <Link
                to="/login"
                className="rounded-xl border border-orange-500 px-5 py-2 font-semibold text-orange-500 transition duration-300 hover:bg-orange-50"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-orange-500 px-5 py-2 font-semibold text-white transition duration-300 hover:bg-orange-600"
              >
                Register
              </Link>

            </div>
          )}

        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative rounded-lg p-2 text-gray-700 lg:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
          {!menuOpen && unreadCount > 0 && (
            <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-gray-100 bg-white px-4 py-4 lg:hidden">

          <Link
            to="/"
            onClick={closeMenu}
            className="rounded-lg px-3 py-3 font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
          >
            Home
          </Link>

          <Link
            to="/marketplace"
            onClick={closeMenu}
            className="rounded-lg px-3 py-3 font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
          >
            Marketplace
          </Link>

          {user && (
            <>
              <Link
                to="/sell"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
              >
                Sell
              </Link>

              <Link
                to="/wishlist"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
              >
                Wishlist
              </Link>

              <Link
                to="/messages"
                onClick={closeMenu}
                className="flex items-center justify-between rounded-lg px-3 py-3 font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
              >
                Messages
                {unreadCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </Link>

              <Link
                to="/my-products"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
              >
                My Products
              </Link>

              <Link
                to="/profile"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
              >
                Profile
              </Link>
            </>
          )}

          <div className="mt-2 border-t border-gray-100 pt-3">
            {user ? (
              <div className="flex flex-col gap-3">
                <span className="px-3 font-semibold text-orange-600">
                  {user.email}
                </span>

                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="rounded-xl bg-red-500 px-5 py-3 font-semibold text-white transition duration-300 hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="rounded-xl border border-orange-500 px-5 py-3 text-center font-semibold text-orange-500 transition duration-300 hover:bg-orange-50"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="rounded-xl bg-orange-500 px-5 py-3 text-center font-semibold text-white transition duration-300 hover:bg-orange-600"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

        </nav>
      )}
    </header>
  );
}