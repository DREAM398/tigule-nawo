import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import SearchBar from "../components/home/SearchBar";
import Categories from "../components/home/Categories";
import FilterBar from "../components/home/FilterBar";
import FeaturedProducts from "../components/home/FeaturedProducts";

export default function Marketplace() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-orange-50">
        {/* Hero */}
        <section className="bg-orange-500 px-4 py-12 text-center text-white md:py-20">
          <h1 className="text-3xl font-black sm:text-4xl md:text-6xl">
            Marketplace
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-orange-100 sm:text-base md:mt-5 md:text-lg">
            Discover phones, laptops, books, clothes, food,
            furniture and many more products sold by students
            across Malawi.
          </p>
        </section>

        {/* Marketplace Content */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">

          <SearchBar />

          <FilterBar />

          <Categories />

          <FeaturedProducts />

        </section>
      </main>

      <Footer />
    </>
  );
}