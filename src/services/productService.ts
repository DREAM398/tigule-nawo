import { supabase } from "../lib/supabase";

export async function createProduct(product: {
  title: string;
  price: string;
  category: string;
  location: string;
  description: string;
  image: string;
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("products")
    .insert([
      {
        ...product,
        user_id: user?.id,
      },
    ])
    .select();

  if (error) throw error;

  return data;
}

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  console.log("GET PRODUCTS");
  console.table(data);

  if (error) throw error;

  return data;
}

export async function getProduct(id: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function getMyProducts() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data;
}

export async function deleteProduct(id: string) {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function updateProduct(
  id: string,
  product: {
    title: string;
    price: string;
    category: string;
    location: string;
    description: string;
    image: string;
  }
) {
  const { data, error } = await supabase
    .from("products")
    .update(product)
    .eq("id", id)
    .select();

  console.log("Updated rows:", data);

  if (error) throw error;

  if (!data || data.length === 0) {
    throw new Error("No product was updated.");
  }

  return data;
}