import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import SearchBar from "../components/home/SearchBar";
import Categories from "../components/home/Categories";
import Stats from "../components/home/Stats";
import FeaturedProducts from "../components/home/FeaturedProducts";

import Button from "../components/ui/Button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-orange-50">
        {/* HERO */}
        <section className="mx-auto flex max-w-7xl flex-col items-center px-4 py-10 text-center sm:px-6 sm:py-24">
          <span className="rounded-full bg-orange-100 px-4 py-1.5 text-xs font-semibold text-orange-600 sm:px-5 sm:py-2 sm:text-sm">
            🇲🇼 Made for Malawian Students
          </span>

          <h1 className="mt-5 text-3xl font-black leading-tight text-gray-900 sm:mt-8 sm:text-5xl md:text-7xl">
            Buy.
            <br />
            Sell.
            <br />
            Save.
            <span className="block text-orange-500">
              Tigule Nawo
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8 md:text-xl">
            Buy and sell phones, laptops, books, clothes, hostel items and much
            more with students across Malawi.
          </p>

          <SearchBar />

          <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
            <Link to="/marketplace" className="w-full sm:w-auto">
              <Button>
                🛒 Browse Marketplace
              </Button>
            </Link>

            <Link to="/sell" className="w-full sm:w-auto">
              <Button variant="secondary">
                ➕ Sell an Item
              </Button>
            </Link>
          </div>
        </section>

        <Categories />

        <Stats />

        <FeaturedProducts />
      </main>

      <Footer />
    </>
  );
}