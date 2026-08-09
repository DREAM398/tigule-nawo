import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/product/ProductCard";
import { useProducts } from "../context/ProductContext";

export default function Wishlist() {
  const { wishlist } = useProducts();

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-orange-50">

        <section className="bg-orange-500 px-4 py-10 text-center text-white sm:py-16">
          <h1 className="text-3xl font-black sm:text-5xl">
            ❤️ My Wishlist
          </h1>

          <p className="mt-2 text-sm sm:mt-4 sm:text-lg">
            Products you've saved for later.
          </p>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-16">

          {wishlist.length === 0 ? (
            <div className="rounded-2xl bg-white p-8 text-center shadow sm:p-16">
              <h2 className="text-xl font-bold text-gray-800 sm:text-3xl">
                Your wishlist is empty.
              </h2>

              <p className="mt-3 text-sm text-gray-500 sm:mt-4 sm:text-base">
                Tap the ❤️ icon on any product to save it.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-8 lg:grid-cols-4">
              {wishlist.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}

        </section>
      </main>

      <Footer />
    </>
  );
}