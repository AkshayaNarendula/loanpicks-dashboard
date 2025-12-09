// app/api/products/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseServer } from "@/lib/supabaseServer";

const QuerySchema = z.object({
  bank: z.string().optional(),

  maxApr: z.preprocess(
    (v) => (typeof v === "string" && v.trim() ? Number(v) : undefined),
    z.number().positive().optional()
  ),

  maxIncome: z.preprocess(
    (v) => (typeof v === "string" && v.trim() ? Number(v) : undefined),
    z.number().positive().optional()
  ),

  minCredit: z.preprocess(
    (v) => (typeof v === "string" && v.trim() ? Number(v) : undefined),
    z.number().positive().optional()
  ),
});

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const parsed = QuerySchema.parse({
      bank: url.searchParams.get("bank") ?? undefined,
      maxApr: url.searchParams.get("maxApr") ?? undefined,
      maxIncome: url.searchParams.get("maxIncome") ?? undefined,
      minCredit: url.searchParams.get("minCredit") ?? undefined,
    });

    const supabase = await supabaseServer(); // ✅ FIXED: must await

    let query = supabase.from("products").select("*");

    if (parsed.bank) {
      query = query.ilike("bank", `%${parsed.bank}%`);
    }
    if (parsed.maxApr !== undefined) {
      query = query.lte("rate_apr", parsed.maxApr);
    }
    if (parsed.maxIncome !== undefined) {
      query = query.lte("min_income", parsed.maxIncome);
    }
    if (parsed.minCredit !== undefined) {
      query = query.lte("min_credit_score", parsed.minCredit);
    }

    query = query.order("rate_apr", { ascending: true });

    const { data, error } = await query;

    if (error) {
      console.error("[/api/products] Supabase error:", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, products: data ?? [] });
  } catch (err: any) {
    console.error("[/api/products] Validation error:", err);
    return NextResponse.json(
      { ok: false, error: err.message || "Invalid query" },
      { status: 400 }
    );
  }
}
