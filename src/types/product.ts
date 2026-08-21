export type Product = {
  id: string;
  user_id: string;

  title: string;
  price: string;
  category: string;
  location: string;
  description: string;
  image: string;
  sold?: boolean;
};