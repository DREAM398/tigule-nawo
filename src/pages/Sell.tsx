import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/ui/Button";

import { createProduct } from "../services/productService";
import { uploadProductImage } from "../services/storageService";
import { useProducts } from "../context/ProductContext";

export default function Sell() {
  const navigate = useNavigate();
  const { refreshProducts } = useProducts();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Phones");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!imageFile) {
      alert("Please choose a product image.");
      return;
    }

    try {
      setLoading(true);

      const imageUrl = await uploadProductImage(imageFile);

      await createProduct({
        title,
        price: `MWK ${price}`,
        category,
        location,
        description,
        image: imageUrl,
      });

      await refreshProducts();

      alert("✅ Product published successfully!");

      navigate("/marketplace");
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to publish product.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-orange-50">
        <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-16">
          <div className="rounded-2xl bg-white p-5 shadow-lg sm:rounded-3xl sm:p-10">
            <h1 className="text-2xl font-black text-gray-900 sm:text-4xl">
              Sell an Item
            </h1>

            <p className="mt-2 text-sm text-gray-600 sm:mt-3 sm:text-base">
              Fill in the details below to list your product.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5 sm:mt-10 sm:space-y-6"
            >
              <div>
                <label className="mb-1.5 block text-sm font-semibold sm:mb-2 sm:text-base">
                  Product Name
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Samsung A34"
                  className="w-full rounded-xl border p-3 text-sm outline-none focus:border-orange-500 sm:p-4 sm:text-base"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold sm:mb-2 sm:text-base">
                  Price (MWK)
                </label>

                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="450000"
                  className="w-full rounded-xl border p-3 text-sm outline-none focus:border-orange-500 sm:p-4 sm:text-base"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold sm:mb-2 sm:text-base">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border p-3 text-sm outline-none focus:border-orange-500 sm:p-4 sm:text-base"
                >
                  <option>Phones</option>
                  <option>Laptops</option>
                  <option>Books</option>
                  <option>Clothes</option>
                  <option>Furniture</option>
                  <option>Food</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold sm:mb-2 sm:text-base">
                  Location
                </label>

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="LUANAR City Campus"
                  className="w-full rounded-xl border p-3 text-sm outline-none focus:border-orange-500 sm:p-4 sm:text-base"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold sm:mb-2 sm:text-base">
                  Description
                </label>

                <textarea
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your product..."
                  className="w-full rounded-xl border p-3 text-sm outline-none focus:border-orange-500 sm:p-4 sm:text-base"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold sm:mb-2 sm:text-base">
                  Product Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setImageFile(
                      e.target.files ? e.target.files[0] : null
                    )
                  }
                  className="w-full rounded-xl border p-3 text-sm sm:p-4 sm:text-base"
                  required
                />

                <p className="mt-2 text-xs text-gray-500 sm:text-sm">
                  Choose a clear photo of your item.
                </p>
              </div>

              <Button
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Uploading..."
                  : "🚀 Publish Product"}
              </Button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}