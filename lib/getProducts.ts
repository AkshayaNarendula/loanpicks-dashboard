// lib/getProducts.ts
import { supabaseServer } from "./supabase-server";

export async function getProducts() {
  const supabase = await supabaseServer();
  const { data } = await supabase.from("products").select("*");
  return data || [];
}
