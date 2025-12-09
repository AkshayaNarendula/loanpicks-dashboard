// app/products/page.tsx
import { supabaseServer } from "@/lib/supabase-server";
import ProductsPageClient from "@/components/ProductsPageClient";

export default async function ProductsPage() {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.from("products").select("*");

  return <ProductsPageClient products={data || []} />;
}
