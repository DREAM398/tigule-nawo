export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-2xl font-black text-white">
        T
      </div>

      <div>
        <h1 className="text-xl font-black text-orange-500">
          Tigule Nawo
        </h1>

        <p className="text-xs text-gray-500">
          Malawi's Student Marketplace
        </p>
      </div>
    </div>
  );
}