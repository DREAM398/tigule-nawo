import ProductCard from "../product/ProductCard";
import products from "../../data/products";

export default function FeaturedProducts() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-3xl font-bold">
          🔥 Fresh on Tigule Nawo
        </h2>

        <button className="rounded-lg bg-orange-500 px-5 py-2 text-white transition hover:bg-orange-600">
          View All
        </button>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            location={product.location}
            image={product.image}
          />
        ))}
      </div>
    </section>
  );
}