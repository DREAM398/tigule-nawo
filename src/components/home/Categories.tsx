import {
  Smartphone,
  Laptop,
  BookOpen,
  Shirt,
  Utensils,
  Package,
} from "lucide-react";

const categories = [
  {
    name: "Phones",
    icon: Smartphone,
  },
  {
    name: "Laptops",
    icon: Laptop,
  },
  {
    name: "Books",
    icon: BookOpen,
  },
  {
    name: "Clothes",
    icon: Shirt,
  },
  {
    name: "Food",
    icon: Utensils,
  },
  {
    name: "Others",
    icon: Package,
  },
];

export default function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">

      <h2 className="mb-8 text-3xl font-bold">
        Browse Categories
      </h2>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">

        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <div
              key={category.name}
              className="cursor-pointer rounded-2xl bg-white p-6 text-center shadow transition hover:-translate-y-1 hover:shadow-lg"
            >
              <Icon
                size={38}
                className="mx-auto text-orange-500"
              />

              <p className="mt-4 font-semibold">
                {category.name}
              </p>

            </div>
          );
        })}

      </div>

    </section>
  );
}