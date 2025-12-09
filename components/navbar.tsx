"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const supabase = supabaseBrowser();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
      setLoading(false);
    }
    load();

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) return null;

  return (
    <nav
      className="
        sticky top-0 z-50
        backdrop-blur-md bg-white/40
        border-b border-purple-200
        px-8 py-4 flex justify-between items-center
        shadow-sm
      "
    >
      <Link href="/" className="text-2xl font-bold text-purple-600 hover:opacity-80 transition">
        LoanPicks
      </Link>

      <div className="flex items-center gap-8 text-lg">

        {!user && (
          <Link href="/login" className="nav-link">Login</Link>
        )}

        {user && (
          <>
            <Link href="/dashboard" prefetch={true} className="nav-link">Dashboard</Link>
            <Link href="/products" prefetch={true} className="nav-link">Products</Link>
            <Link href="/compare" prefetch={true} className="nav-link">Compare</Link>

            <button
              onClick={logout}
              className="text-red-600 hover:text-red-700 transition font-medium"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
