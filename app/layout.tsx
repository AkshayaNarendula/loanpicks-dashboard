// app/layout.tsx
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper"; // Use wrapper to hide navbar on login
import type { ReactNode } from "react";

export const metadata = {
  title: "LoanPicks",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className="
          min-h-screen 
          bg-gradient-to-br from-purple-100 via-white to-indigo-100
          text-black
        "
      >
        {/* Navbar Wrapper (hides navbar on login/signup automatically) */}
        <NavbarWrapper />

        <main className="pt-6 pb-16">
          {children}
        </main>
      </body>
    </html>
  );
}
