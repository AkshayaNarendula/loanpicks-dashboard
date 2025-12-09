// app/dashboard/page.tsx
export const runtime = "edge";      // ⚡ faster edge runtime
export const revalidate = 60;       // ⚡ cache response for 1 min

import { redirect } from "next/navigation";
import DashboardClient from "@/components/DashboardClient";
import { supabaseServer } from "@/lib/supabase-server";
import { getProducts } from "@/lib/getProducts";

export default async function DashboardPage() {
  const supabase = await supabaseServer();

  // Faster auth check
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session) redirect("/login");

  // Cached product fetch
  const products = await getProducts();
  if (!products.length) return <div className="p-10">No products found.</div>;

  const sorted = [...products].sort(
    (a: any, b: any) => Number(a.rate_apr) - Number(b.rate_apr)
  );

  return (
    <div className="p-10">
      <DashboardClient top5={sorted.slice(0, 5)} products={products} />
    </div>
  );
}
