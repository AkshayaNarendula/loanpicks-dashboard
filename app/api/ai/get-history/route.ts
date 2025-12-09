import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseServer } from "@/lib/supabaseServer";

const schema = z.object({
  productId: z.string(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { productId } = schema.parse(json);

    return NextResponse.json({ history: [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
