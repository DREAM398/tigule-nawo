import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/product/ProductCard";
import Button from "../components/ui/Button";

import type { Product } from "../types/product";

import {
  getMyProducts,
  deleteProduct,
  toggleSoldStatus,
} from "../services/productService";

import { useProducts } from "../context/ProductContext";

export default function MyProducts() {
  const { refreshProducts } = useProducts();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getMyProducts();
      setProducts((data as Product[]) || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmed) return;

  try {
    await deleteProduct(id);

    await refreshProducts();

    alert("Deleted successfully!");

    loadProducts();
  } catch (error) {
    console.error(error);
    alert(JSON.stringify(error));
  }
}

  async function handleToggleSold(id: string, currentSold: boolean | undefined) {
    try {
      await toggleSoldStatus(id, !currentSold);

      await refreshProducts();

      loadProducts();
    } catch (error) {
      console.error(error);
      alert("Failed to update sold status.");
    }
  }
//
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-orange-50">

        {/* Hero */}
        <section className="bg-orange-500 px-4 py-10 text-center text-white sm:py-16">
          <h1 className="text-3xl font-black sm:text-5xl">
            My Products
          </h1>

          <p className="mt-2 text-sm sm:mt-4 sm:text-lg">
            Manage all the products you've listed.
          </p>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-16">

          <div className="mb-6 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">

            <h2 className="text-xl font-bold sm:text-3xl">
              Your Listings
            </h2>

            <Link to="/sell">
              <Button>
                + Sell New Product
              </Button>
            </Link>

          </div>

          {loading ? (

            <div className="rounded-2xl bg-white p-8 text-center shadow sm:p-16">
              <h2 className="text-lg font-bold sm:text-2xl">
                Loading...
              </h2>
            </div>

          ) : products.length === 0 ? (

            <div className="rounded-2xl bg-white p-8 text-center shadow sm:p-16">

              <h2 className="text-xl font-bold sm:text-3xl">
                You haven't posted anything yet.
              </h2>

              <p className="mt-3 text-sm text-gray-500 sm:mt-4 sm:text-base">
                Publish your first product to start selling.
              </p>

              <div className="mt-6 sm:mt-8">
                <Link to="/sell">
                  <Button>
                    Sell Your First Product
                  </Button>
                </Link>
              </div>

            </div>

          ) : (

            <div className="grid grid-cols-2 gap-3 sm:gap-8 lg:grid-cols-4">

              {products.map((product) => (

                <div
                  key={product.id}
                  className="rounded-xl bg-white p-2 shadow sm:rounded-2xl sm:p-3"
                >

                  <ProductCard product={product} />

                  <div className="mt-2 flex flex-col gap-2">

                    <button
                      onClick={() =>
                        handleToggleSold(product.id, product.sold)
                      }
                      className={`w-full rounded-lg py-2 text-sm font-semibold transition sm:rounded-xl sm:py-2.5 ${
                        product.sold
                          ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                    >
                      {product.sold ? "Mark as Available" : "Mark as Sold"}
                    </button>

                    <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">

                      <Link
                        className="w-full sm:flex-1"
                        to={`/edit-product/${product.id}`}
                      >
                        <Button
                          variant="secondary"
                        >
                          Edit
                        </Button>
                      </Link>

                      <Button
                        onClick={() =>
                          handleDelete(product.id)
                        }
                      >
                        Delete
                      </Button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

      <Footer />
    </>
  );
}