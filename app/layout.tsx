// app/layout.tsx
import "./globals.css";
import Navbar from "@/components/navbar";
import type { ReactNode } from "react";

export const metadata = {
  title: "LoanPicks",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Navbar is a client component that can decide what to show based on auth */}
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
