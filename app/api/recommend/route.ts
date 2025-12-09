import { supabaseServer } from "@/lib/supabase-server";

export async function POST(req: Request) {
  const { income, credit } = await req.json();

  const supabase = await supabaseServer();
  const { data: products, error } = await supabase.from("products").select("*");

  if (error) return Response.json({ error: error.message }, { status: 500 });

  // ⭐ Recommendation Score Formula
  const scored = products.map((p) => {
    const incomeMatch = income >= p.min_income ? 40 : 0;
    const creditMatch = credit >= p.min_credit_score ? 40 : 0;
    const aprScore = 15 - p.rate_apr; // lower APR = better
    const prepayScore = p.prepayment_allowed ? 5 : 0;
    const docsScore = p.docs_level === "low" ? 5 : 0;

    const score = incomeMatch + creditMatch + aprScore + prepayScore + docsScore;

    return { ...p, score };
  });

  const top5 = scored.sort((a, b) => b.score - a.score).slice(0, 5);

  return Response.json(top5);
}
