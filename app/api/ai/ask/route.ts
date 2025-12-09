//app\api\ai\ask\route.ts
import { NextResponse } from "next/server";
import { askSchema } from "@/lib/schemas";
import { callOpenRouter } from "@/lib/openrouter";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = askSchema.parse(body);
    const { message, history = [], productId } = parsed;

    // ALWAYS await 👇
    const supabase = await supabaseServer();

    // Fetch product
    const { data: product, error: productErr } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .maybeSingle();

    if (productErr) {
      console.error("Product fetch error:", productErr);
      return NextResponse.json({ error: "Failed to load product" }, { status: 500 });
    }

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Call AI
    const reply = await callOpenRouter({
      message,
      history,
      product,
    });

    // Get logged-in user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const userId = user?.id ?? null;

    // Store chat history
    await supabase.from("ai_chat_messages").insert({
      user_id: userId,
      product_id: productId,
      role: "user",
      content: message,
    });

    await supabase.from("ai_chat_messages").insert({
      user_id: userId,
      product_id: productId,
      role: "assistant",
      content: reply,
    });

    return NextResponse.json({ answer: reply });
  } catch (err: any) {
    console.error("ASK route error:", err);
    return NextResponse.json({ error: err.message ?? "Server error" }, { status: 500 });
  }
}
