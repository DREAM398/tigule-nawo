import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="mx-auto mt-10 flex w-full max-w-4xl items-center rounded-2xl bg-white px-5 shadow-lg">

      <Search
        size={22}
        className="text-gray-400"
      />

      <input
        type="text"
        placeholder="Search phones, laptops, books, hostel items..."
        className="h-16 flex-1 px-4 outline-none"
      />

      <button className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600">
        Search
      </button>

    </div>
  );
}