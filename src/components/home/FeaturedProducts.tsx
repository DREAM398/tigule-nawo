import ProductCard from "../product/ProductCard";
import Button from "../ui/Button";
import SectionTitle from "../ui/SectionTitle";
import { useProducts } from "../../context/ProductContext";

export default function FeaturedProducts() {
  const {
    products,
    search,
    selectedCategory,
  } = useProducts();

  const filteredProducts = products.filter((product) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      product.title.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword) ||
      product.location.toLowerCase().includes(keyword) ||
      product.description.toLowerCase().includes(keyword);

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-20">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:mb-10 sm:flex-row sm:items-center sm:gap-6">
        <SectionTitle
          title="🔥 Fresh on Tigule Nawo"
          subtitle="Recently added products from students across Malawi."
        />

        <Button>
          View All
        </Button>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow sm:p-16">
          <h2 className="text-xl font-bold text-gray-800 sm:text-3xl">
            No products found
          </h2>

          <p className="mt-3 text-sm text-gray-500 sm:mt-4 sm:text-base">
            Try another search or category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
}