import { Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../../types/product";
import { useProducts } from "../../context/ProductContext";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  const {
    toggleWishlist,
    isWishlisted,
  } = useProducts();

  const saved = isWishlisted(product.id);

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl sm:rounded-2xl">

      <div className="relative">

        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="h-32 w-full object-cover sm:h-56"
          />
        </Link>

        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute right-2 top-2 rounded-full p-1.5 shadow transition sm:right-3 sm:top-3 sm:p-2 ${
            saved
              ? "bg-orange-500 text-white"
              : "bg-white hover:bg-orange-500 hover:text-white"
          }`}
        >
          <Heart
            size={14}
            className="sm:hidden"
            fill={saved ? "currentColor" : "none"}
          />
          <Heart
            size={18}
            className="hidden sm:block"
            fill={saved ? "currentColor" : "none"}
          />
        </button>

        <span className="absolute left-2 top-2 rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-bold text-white sm:left-3 sm:top-3 sm:px-3 sm:py-1 sm:text-xs">
          NEW
        </span>
      </div>

      <div className="space-y-1.5 p-2.5 sm:space-y-3 sm:p-5">

        <h3 className="line-clamp-1 text-sm font-bold text-gray-800 sm:text-xl">
          {product.title}
        </h3>

        <p className="text-lg font-black text-orange-500 sm:text-2xl">
          {product.price}
        </p>

        <div className="flex items-center gap-1 text-xs text-gray-500 sm:gap-2 sm:text-base">
          <MapPin size={13} className="sm:hidden" />
          <MapPin size={18} className="hidden sm:block" />
          <span className="line-clamp-1">{product.location}</span>
        </div>

        <Link to={`/product/${product.id}`}>
          <button className="w-full rounded-lg bg-orange-500 py-2 text-sm font-semibold text-white transition hover:bg-orange-600 sm:rounded-xl sm:py-3 sm:text-base">
            View Details
          </button>
        </Link>

      </div>

    </div>
  );
}