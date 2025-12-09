// app/dashboard/page.tsx
import { supabaseServer } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import DashboardClient from "@/components/DashboardClient";

export default async function DashboardPage() {
  // ✅ Must await — supabaseServer returns a Promise
  const supabase = await supabaseServer();

  // ✅ Auth check
  const { data: auth } = await supabase.auth.getUser();
  if (!auth?.user) redirect("/login");

  // ✅ Fetch Products
  const { data: products, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.error("Supabase /dashboard error:", error);
    return <div className="p-10 text-red-600">Failed to load products.</div>;
  }

  if (!products || products.length === 0) {
    return <div className="p-10">No products found.</div>;
  }

  // ✅ Sort by APR
  const sorted = [...products].sort(
    (a: any, b: any) => Number(a.rate_apr) - Number(b.rate_apr)
  );

  const top5 = sorted.slice(0, 5);

  // Render
  return (
    <div className="p-10">
      <DashboardClient top5={top5} products={products} />
    </div>
  );
}
