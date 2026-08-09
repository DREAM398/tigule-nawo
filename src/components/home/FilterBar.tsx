export default function FilterBar() {
  return (
    <div className="my-6 flex gap-2 overflow-x-auto pb-2 sm:my-10 sm:flex-wrap sm:gap-4 sm:overflow-visible sm:pb-0">

      <button className="whitespace-nowrap rounded-full bg-orange-500 px-4 py-1.5 text-sm text-white sm:px-5 sm:py-2 sm:text-base">
        All
      </button>

      <button className="whitespace-nowrap rounded-full bg-white px-4 py-1.5 text-sm shadow sm:px-5 sm:py-2 sm:text-base">
        Phones
      </button>

      <button className="whitespace-nowrap rounded-full bg-white px-4 py-1.5 text-sm shadow sm:px-5 sm:py-2 sm:text-base">
        Laptops
      </button>

      <button className="whitespace-nowrap rounded-full bg-white px-4 py-1.5 text-sm shadow sm:px-5 sm:py-2 sm:text-base">
        Books
      </button>

      <button className="whitespace-nowrap rounded-full bg-white px-4 py-1.5 text-sm shadow sm:px-5 sm:py-2 sm:text-base">
        Clothes
      </button>

      <button className="whitespace-nowrap rounded-full bg-white px-4 py-1.5 text-sm shadow sm:px-5 sm:py-2 sm:text-base">
        Food
      </button>

    </div>
  );
}