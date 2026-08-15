import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useProducts } from "../context/ProductContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/ui/Button";

import {
  getProduct,
  updateProduct,
} from "../services/productService";

import { uploadProductImage } from "../services/storageService";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refreshProducts } = useProducts();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  async function loadProduct() {
    try {
      setPageLoading(true);

      const product = await getProduct(id!);

      setTitle(product.title);
      setPrice(product.price.replace("MWK ", ""));
      setCategory(product.category);
      setLocation(product.location);
      setDescription(product.description);
      setImage(product.image);
    } catch (error) {
      console.error("Load Product Error:", error);
      alert("Failed to load product.");
    } finally {
      setPageLoading(false);
    }
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!id) return;

    try {
      setLoading(true);

      let imageUrl = image;

      if (newImage) {
        imageUrl = await uploadProductImage(newImage);
      }

      await updateProduct(id, {
        title,
        price: `MWK ${price}`,
        category,
        location,
        description,
        image: imageUrl,
      });

      //refresh all the products 
      console.log("Refreshing products...");
      await refreshProducts();

      alert("✅ Product updated successfully!");

      navigate("/my-products");
    } catch (error: any) {
      console.error("Update Error:", error);

      alert(
        error?.message ||
        JSON.stringify(error) ||
        "Failed to update product."
      );
    } finally {
      setLoading(false);
    }
  }

  if (pageLoading) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-screen items-center justify-center bg-orange-50">
          <h1 className="text-3xl font-bold">
            Loading product...
          </h1>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-orange-50">
        <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-16">
          <div className="rounded-2xl bg-white p-5 shadow-lg sm:rounded-3xl sm:p-10">

            <h1 className="text-2xl font-black sm:text-4xl">
              Edit Product
            </h1>

            <p className="mt-2 text-sm text-gray-600 sm:mt-3 sm:text-base">
              Update your product information.
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
                  className="w-full rounded-xl border p-3 text-sm outline-none focus:border-orange-500 sm:p-4 sm:text-base"
                  placeholder="Product Name"
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
                  className="w-full rounded-xl border p-3 text-sm outline-none focus:border-orange-500 sm:p-4 sm:text-base"
                  placeholder="450000"
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
                  required
                >
                  <option>Phones</option>
                  <option>Laptops</option>
                  <option>Books</option>
                  <option>Clothes</option>
                  <option>Furniture</option>
                  <option>Food</option>
                  <option>Housing</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold sm:mb-2 sm:text-base">
                  Location
                </label>

                <input
                  type="text"
                  list="campus-options"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-xl border p-3 text-sm outline-none focus:border-orange-500 sm:p-4 sm:text-base"
                  placeholder="Select or type your campus"
                  required
                />

                <datalist id="campus-options">
                  <option value="LUANAR Bunda Campus" />
                  <option value="LUANAR City Campus" />
                  <option value="Chancellor College" />
                  <option value="Malawi Polytechnic (MUBAS)" />
                  <option value="Kamuzu University of Health Sciences" />
                  <option value="Mzuzu University" />
                  <option value="Malawi University of Science and Technology" />
                  <option value="Catholic University of Malawi" />
                  <option value="University of Livingstonia" />
                  <option value="DMI St. Eugene University" />
                </datalist>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold sm:mb-2 sm:text-base">
                  Description
                </label>

                <textarea
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-xl border p-3 text-sm outline-none focus:border-orange-500 sm:p-4 sm:text-base"
                  placeholder="Describe your product..."
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold sm:mb-2 sm:text-base">
                  Current Image
                </label>

                <img
                  src={image}
                  alt={title}
                  className="mb-3 h-40 w-full rounded-xl object-cover sm:mb-4 sm:h-56"
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setNewImage(
                      e.target.files
                        ? e.target.files[0]
                        : null
                    )
                  }
                  className="w-full rounded-xl border p-3 text-sm sm:p-4 sm:text-base"
                />

                <p className="mt-2 text-xs text-gray-500 sm:text-sm">
                  Leave empty if you don't want to change the image.
                </p>
              </div>

              <Button
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Updating..."
                  : "💾 Save Changes"}
              </Button>

            </form>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}