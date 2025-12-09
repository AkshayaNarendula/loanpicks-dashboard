// components/ProductsPageClient.tsx
"use client";

import React, { useMemo, useState } from "react";
import ProductCard, { Product } from "./product-card";
import ProductsFilter from "@/components/products-filter";

export default function ProductsPageClient({ products }: { products: Product[] }) {
  const [filters, setFilters] = useState<any>({});

  const filtered = useMemo(() => {
    return (products || []).filter((p) => {
      if (!p) return false;

      // Bank filter (includes)
      if (filters.bank && !(p.bank || "").toLowerCase().includes(filters.bank.toLowerCase())) {
        return false;
      }

      // APR: p.rate_apr must be <= maxApr
      if (filters.maxApr !== undefined && filters.maxApr !== null) {
        if (typeof p.rate_apr !== "number" || p.rate_apr > filters.maxApr) return false;
      }

      // Max income: min_income must be <= maxIncome
      if (filters.maxIncome !== undefined && filters.maxIncome !== null) {
        if (typeof p.min_income !== "number" || p.min_income > filters.maxIncome) return false;
      }

      // Min credit score: min_credit_score must be >= minCredit
      if (filters.minCredit !== undefined && filters.minCredit !== null) {
        if (typeof p.min_credit_score !== "number" || p.min_credit_score < filters.minCredit) return false;
      }

      return true;
    });
  }, [products, filters]);

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-6 font-bold">All Products</h1>

      <ProductsFilter onApply={(f) => setFilters(f)} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
