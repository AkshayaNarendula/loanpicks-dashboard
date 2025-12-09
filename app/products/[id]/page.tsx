import { supabaseServer } from "@/lib/supabaseServer";

export default async function ProductDetail(props: { params: Promise<{ id: string }> }) {
  
  // ⬇ MUST await params (Next.js 14+ behavior)
  const { id } = await props.params;

  const supabase = await supabaseServer();
  
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Supabase Error (Product Detail):", error);
  }

  if (!data) {
    return (
      <div className="p-10 text-red-600 text-center text-xl">
        Product not found.
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">{data.name}</h1>
      <p className="text-gray-600">{data.bank} • {data.type}</p>

      <div className="mt-4 space-y-2">
        <p><b>APR:</b> {data.rate_apr}%</p>
        <p><b>Income Required:</b> ₹{data.min_income}</p>
        <p><b>Credit Score:</b> {data.min_credit_score}</p>
        <p><b>Summary:</b> {data.summary}</p>
      </div>
    </div>
  );
}
