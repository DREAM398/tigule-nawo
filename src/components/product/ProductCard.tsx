import { Heart, MapPin } from "lucide-react";

type ProductCardProps = {
  title: string;
  price: string;
  location: string;
  image: string;
};

export default function ProductCard({
  title,
  price,
  location,
  image,
}: ProductCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">

      <div className="relative">

        <img
          src={image}
          alt={title}
          className="h-56 w-full object-cover"
        />

        <button className="absolute right-3 top-3 rounded-full bg-white p-2 shadow hover:bg-orange-500 hover:text-white transition">
          <Heart size={18} />
        </button>

        <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
          NEW
        </span>

      </div>

      <div className="space-y-3 p-5">

        <h3 className="text-xl font-bold text-gray-800">
          {title}
        </h3>

        <p className="text-2xl font-black text-orange-500">
          {price}
        </p>

        <div className="flex items-center gap-2 text-gray-500">
          <MapPin size={18} />
          <span>{location}</span>
        </div>

        <button className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600">
          View Details
        </button>

      </div>

    </div>
  );
}