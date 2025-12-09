// app/compare/page.tsx
import CompareClient from "@/components/CompareClient";
import { supabaseServer } from "@/lib/supabase-server";

export default async function ComparePage() {
  const supabase = await supabaseServer(); // ✅ FIXED (must await)

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Supabase error loading products:", error);
  }

  return <CompareClient initialProducts={data ?? []} />;
}
