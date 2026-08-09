import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import type { ReactNode } from "react";

import type { Product } from "../types/product";
import { getProducts } from "../services/productService";

type ProductContextType = {
  products: Product[];
  refreshProducts: () => Promise<void>;

  search: string;
  setSearch: (value: string) => void;

  selectedCategory: string;
  setSelectedCategory: (value: string) => void;

  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isWishlisted: (id: string) => boolean;
};

const ProductContext = createContext<
  ProductContextType | undefined
>(undefined);

export function ProductProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    refreshProducts();
  }, []);

  async function refreshProducts() {
  try {
    const data = await getProducts();

    console.log("Products from Supabase:", data);

    setProducts(data || []);
  } catch (error) {
    console.error(error);
  }
}

  function toggleWishlist(product: Product) {
    const exists = wishlist.some(
      (item) => item.id === product.id
    );

    if (exists) {
      setWishlist((prev) =>
        prev.filter((item) => item.id !== product.id)
      );
    } else {
      setWishlist((prev) => [...prev, product]);
    }
  }

  function isWishlisted(id: string) {
    return wishlist.some(
      (item) => item.id === id
    );
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        refreshProducts,
        search,
        setSearch,
        selectedCategory,
        setSelectedCategory,
        wishlist,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error(
      "useProducts must be used inside ProductProvider"
    );
  }

  return context;
}