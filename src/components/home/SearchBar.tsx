import { Search } from "lucide-react";
import { useProducts } from "../../context/ProductContext";

export default function SearchBar() {
  const { search, setSearch } = useProducts();

  return (
    <div className="mx-auto mt-6 flex w-full max-w-4xl flex-col gap-2 sm:mt-10 sm:flex-row sm:items-center sm:gap-0 sm:rounded-2xl sm:bg-white sm:px-5 sm:shadow-lg">

      <div className="flex items-center rounded-xl bg-white px-4 shadow sm:flex-1 sm:rounded-none sm:px-0 sm:shadow-none">
        <Search
          size={20}
          className="text-gray-400 sm:size-[22px]"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search phones, laptops, books..."
          className="h-12 flex-1 px-3 text-sm outline-none sm:h-16 sm:px-4 sm:text-base"
        />
      </div>

      <button className="w-full rounded-xl bg-orange-500 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 sm:w-auto sm:px-6 sm:text-base">
        Search
      </button>
    </div>
  );
}