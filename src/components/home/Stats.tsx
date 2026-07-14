export default function Stats() {
  return (
    <section className="mx-auto mt-20 max-w-7xl px-6">
      <div className="grid gap-8 rounded-3xl bg-orange-500 p-10 text-center text-white md:grid-cols-4">

        <div>
          <h2 className="text-4xl font-black">500+</h2>
          <p>Students</p>
        </div>

        <div>
          <h2 className="text-4xl font-black">200+</h2>
          <p>Products</p>
        </div>

        <div>
          <h2 className="text-4xl font-black">20+</h2>
          <p>Campuses</p>
        </div>

        <div>
          <h2 className="text-4xl font-black">24/7</h2>
          <p>Marketplace</p>
        </div>

      </div>
    </section>
  );
}