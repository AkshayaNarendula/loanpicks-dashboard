// app/layout.tsx
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper"; 
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
        <NavbarWrapper />

        {/* GLOBAL PAGE TRANSITION */}
        <main className="page-transition">
          {children}
        </main>
      </body>
    </html>
  );
}
