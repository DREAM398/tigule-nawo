import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import SearchBar from "../components/home/SearchBar";
import Categories from "../components/home/Categories";
import Stats from "../components/home/Stats";
import FeaturedProducts from "../components/home/FeaturedProducts";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-orange-50">
        {/* ================= HERO ================= */}
        <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">
          <span className="rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-600">
            🇲🇼 Made for Malawian Students
          </span>

          <h1 className="mt-8 text-5xl font-black leading-tight text-gray-900 md:text-7xl">
            Buy.
            <br />
            Sell.
            <br />
            Save.
            <span className="block text-orange-500">
              Tigule Nawo
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600 md:text-xl">
            Buy and sell phones, laptops, books, clothes, hostel items and much
            more with students across Malawi.
          </p>

          <SearchBar />

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button className="rounded-xl bg-orange-500 px-8 py-3 font-semibold text-white transition duration-300 hover:bg-orange-600">
              🛒 Browse Marketplace
            </button>

            <button className="rounded-xl border-2 border-orange-500 px-8 py-3 font-semibold text-orange-500 transition duration-300 hover:bg-orange-100">
              ➕ Sell an Item
            </button>
          </div>
        </section>

        {/* ================= CATEGORIES ================= */}
        <Categories />

        {/* ================= STATS ================= */}
        <Stats />

        {/* ================= FEATURED PRODUCTS ================= */}
        <FeaturedProducts />
      </main>

      <Footer />
    </>
  );
}