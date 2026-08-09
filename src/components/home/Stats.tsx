export default function Stats() {
  return (
    <section className="mx-auto mt-10 max-w-7xl px-4 sm:mt-20 sm:px-6">
      <div className="grid grid-cols-2 gap-4 rounded-2xl bg-orange-500 p-5 text-center text-white sm:gap-8 sm:rounded-3xl sm:p-10 md:grid-cols-4">

        <div>
          <h2 className="text-2xl font-black sm:text-4xl">500+</h2>
          <p className="text-xs sm:text-base">Students</p>
        </div>

        <div>
          <h2 className="text-2xl font-black sm:text-4xl">200+</h2>
          <p className="text-xs sm:text-base">Products</p>
        </div>

        <div>
          <h2 className="text-2xl font-black sm:text-4xl">20+</h2>
          <p className="text-xs sm:text-base">Campuses</p>
        </div>

        <div>
          <h2 className="text-2xl font-black sm:text-4xl">24/7</h2>
          <p className="text-xs sm:text-base">Marketplace</p>
        </div>

      </div>
    </section>
  );
}