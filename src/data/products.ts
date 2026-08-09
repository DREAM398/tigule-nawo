import type { Product } from "../types/product";

const products: Product[] = [
  {
    id: "1",
    user_id: "demo-user",
    title: "Samsung A34",
    price: "MWK 450,000",
    location: "LUANAR City Campus",
    category: "Phones",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
    description: "Excellent condition with original charger.",
  },

  {
    id: "2",
    user_id: "demo-user",
    title: "HP EliteBook",
    price: "MWK 680,000",
    location: "LUANAR City Campus",
    category: "Laptops",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600",
    description: "Intel Core i5, 8GB RAM, 256GB SSD.",
  },

  {
    id: "3",
    user_id: "demo-user",
    title: "Calculus Textbook",
    price: "MWK 18,000",
    location: "LUANAR City Campus",
    category: "Books",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600",
    description: "Perfect for first-year engineering students.",
  },

  {
    id: "4",
    user_id: "demo-user",
    title: "Office Chair",
    price: "MWK 75,000",
    location: "Area 25",
    category: "Furniture",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600",
    description: "Comfortable office chair in excellent condition.",
  },
];

export default products;