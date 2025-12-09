// components/ui/Badge.tsx
"use client";

import React from "react";

/**
 * Simple Badge (shadcn-like)
 * Use this in product-card to show generated badges.
 */

export default function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-800 border border-purple-100 " +
        className
      }
    >
      {children}
    </span>
  );
}
