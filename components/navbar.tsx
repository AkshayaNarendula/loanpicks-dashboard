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

    // listen to login/logout events
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    router.push("/"); // 👈 redirect to homepage
  }

  if (loading) return null;

  return (
    <nav className="flex justify-between px-8 py-4 border-b">
      <Link href="/" className="text-2xl font-bold text-purple-600">
        LoanPicks
      </Link>

      <div className="flex items-center gap-6 text-lg">
        {/* LOGGED IN */}
        {user && (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/products">Products</Link>
            <Link href="/compare">Compare</Link>

            <button
              onClick={logout}
              className="text-red-600 hover:text-red-700"
            >
              Logout
            </button>
          </>
        )}

        {/* LOGGED OUT — now empty (NO login button) */}
        {!user && <></>}
      </div>
    </nav>
  );
}
