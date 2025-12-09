// app/home/page.tsx
import { supabaseServer } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function HomeAfterLogin() {

  const supabase = await supabaseServer(); // ✅ FIXED (must await!)

  const { data } = await supabase.auth.getUser();

  if (!data?.user) {
    redirect("/login");
  }

  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold">Welcome Back 👋</h1>
      <p className="mt-4 text-lg text-gray-600">
        Use the navbar to explore your dashboard, products, or comparison tools.
      </p>
    </div>
  );
}
