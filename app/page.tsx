// app/page.tsx
import { supabaseServer } from "@/lib/supabase-server";

export default async function HomePage() {
  const supabase = await supabaseServer();
  const { data } = await supabase.auth.getUser();

  // If user is logged in → only show welcome text
  if (data?.user) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-4xl font-bold">Welcome back!</h1>
        <p className="mt-4 text-gray-600">Go to your dashboard</p>
      </div>
    );
  }

  // If user is NOT logged in → landing welcome
  return (
    <div className="p-20 text-center">
      <h1 className="text-4xl font-bold">Welcome to LoanPicks</h1>
      <p className="mt-4 text-gray-600">
        Login or signup to explore your best loan matches
      </p>
    </div>
  );
}
