import {
  Smartphone,
  Laptop,
  BookOpen,
  Shirt,
  Utensils,
  Package,
  LayoutGrid,
  Home,
} from "lucide-react";

import { useProducts } from "../../context/ProductContext";

const categories = [
  { name: "All", icon: LayoutGrid },
  { name: "Phones", icon: Smartphone },
  { name: "Laptops", icon: Laptop },
  { name: "Books", icon: BookOpen },
  { name: "Clothes", icon: Shirt },
  { name: "Food", icon: Utensils },
  { name: "Furniture", icon: Package },
  { name: "Housing", icon: Home },
];

export default function Categories() {
  const { selectedCategory, setSelectedCategory } = useProducts();

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
      <h2 className="mb-4 text-xl font-bold sm:mb-8 sm:text-3xl">
        Browse Categories
      </h2>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-5 lg:grid-cols-8">
        {categories.map((category) => {
          const Icon = category.icon;
          const active = selectedCategory === category.name;

          return (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`rounded-xl p-3 text-center shadow transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:rounded-2xl sm:p-6 ${
                active
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              <Icon
                size={24}
                className={`mx-auto sm:hidden ${
                  active ? "text-white" : "text-orange-500"
                }`}
              />
              <Icon
                size={38}
                className={`mx-auto hidden sm:block ${
                  active ? "text-white" : "text-orange-500"
                }`}
              />

              <p className="mt-2 text-xs font-semibold sm:mt-4 sm:text-base">
                {category.name}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}